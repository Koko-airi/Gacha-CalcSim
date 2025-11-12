"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { figtree } from "@/lib/fonts";
import PullPlan from "../_components/PullPlan";
import PullChart from "../_components/PullChart";
import usePullPlan from "@/hooks/usePullPlan";
import {
  findProbabilityForPullCount,
  getExactFeaturedRates,
  parseRatesForGraph,
} from "@/lib/algorithms/calculator";

export default function CalculatorPage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  /* We import the pull plan state from the custom hook here.
   * This will give us access to the current pull plan slots.
   * We need this to make calculations for the graph and table,
   * hence why we import here instead of in the PullPlan component.
   */
  const pullPlanState = usePullPlan();
  const slots = pullPlanState[0];
  const { game } = use(params);

  const [numPulls, setNumPulls] = useState("10");
  const [chartData, setChartData] = useState<Record<string, string | number>[]>(
    []
  );
  const [tableData, setTableData] = useState<Record<
    string,
    string | number
  > | null>(null);
  const [rates, setRates] = useState<Record<string, string | number>[]>([]);
  const [offset, setOffset] = useState(0);
  const [milestoneLabels, setMilestoneLabels] = useState<
    Record<string, string>
  >({});

  // Recalculate rates when pull plan changes
  useEffect(() => {
    // Build pull string and calculate total copies needed
    let pullString = "";
    let totalCopiesNeeded = 0;
    const labelMap: Record<string, string> = {};

    // Get the first slot to determine base offset for display
    const firstSlot = slots[0];
    const firstCurrent = firstSlot.current;
    const firstPrefix = firstSlot.type === "Character" ? "c" : "r";
    let calculatedOffset =
      firstCurrent === "None" ? 0 : Number(firstCurrent.slice(1)) + 1;

    if (firstSlot.type === "Weapon" && firstSlot.current === "None") {
      calculatedOffset = 1;
    }

    let milestoneIndex = 0; // Track which copy/milestone we're on

    for (const slot of slots) {
      const current = slot.current;
      const target = slot.target;

      // Calculate how many copies needed for this slot
      let currentLevel = current === "None" ? 0 : Number(current.slice(1)) + 1;
      const targetLevel = Number(target.slice(1)) + 1;

      // Weapons start at r1, not r0
      if (slot.type === "Weapon" && current === "None") {
        currentLevel = 1;
      }

      const copiesForThisSlot = targetLevel - currentLevel;

      // Generate labels for each milestone
      for (let i = 0; i < copiesForThisSlot; i++) {
        const milestoneLevel = currentLevel + i;
        const prefix = slot.type === "Character" ? "c" : "r";

        // The key in the chart data uses the FIRST slot's prefix, but offset by milestoneIndex
        // This matches how parseRatesForGraph and the algorithm output their keys
        const chartKey = `${firstPrefix}${calculatedOffset + milestoneIndex}`;
        const label = `Reward ${
          slots.indexOf(slot) + 1
        }: ${prefix}${milestoneLevel}`;

        labelMap[chartKey] = label;
        milestoneIndex++;
      }

      totalCopiesNeeded += copiesForThisSlot;

      // Add to pull string (e.g., "C" or "W" repeated for each copy)
      pullString += slot.type.charAt(0).repeat(copiesForThisSlot);
    }

    setMilestoneLabels(labelMap);

    // If no copies needed, set empty data
    if (totalCopiesNeeded === 0) {
      setRates([]);
      setChartData([]);
      setTableData(null);
      setOffset(0);
      return;
    }

    setOffset(calculatedOffset);

    const calculatedRates = getExactFeaturedRates(
      totalCopiesNeeded,
      pullString
    );
    setRates(calculatedRates);

    const chartResults = parseRatesForGraph(calculatedRates, calculatedOffset);
    setChartData(chartResults);

    const tableResults = findProbabilityForPullCount(
      calculatedRates,
      numPulls,
      calculatedOffset
    );
    setTableData(tableResults);
  }, [slots]);

  // Update table data when numPulls changes
  useEffect(() => {
    if (rates.length > 0) {
      const tableResults = findProbabilityForPullCount(rates, numPulls, offset);
      setTableData(tableResults);
    }
  }, [numPulls, rates, offset]);

  return (
    <div className="min-h-screen p-4 py-8 md:p-8 fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="relative">
          <Link
            href="/"
            className="hover:bg-transparent cursor-pointer text-gray-100 drop-shadow-sm drop-shadow-gray-200/40 absolute z-20 top-2 transition-transform duration-200 hover:scale-105"
          >
            <ArrowLeft className="size-6" />
          </Link>
          <h1
            className={`text-4xl font-semibold drop-shadow-emerald-600 drop-shadow-xs text-emerald-200 ${figtree.className} text-center`}
          >
            {game === "genshin"
              ? "Genshin Impact"
              : game === "hsr"
              ? "Honkai Star Rail"
              : "Zenless Zone Zero"}{" "}
            Calculator
          </h1>
        </div>

        {/* Input Card */}
        <Card className="p-6 shadow-xl border-2">
          <div className="space-y-6">
            {/* Pull Plan Section */}
            <PullPlan pullPlanState={pullPlanState} />

            {/* Number of Pulls Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium"># of Pulls</label>
              <Input
                type="number"
                value={numPulls}
                min={0}
                onChange={e => setNumPulls(e.target.value)}
                className="h-12 px-4"
                placeholder="Enter number of pulls"
              />
            </div>

            {/* Result Display */}
            <div className="p-6 bg-muted rounded-lg border-2 border-primary/20">
              <p className="text-lg text-center">
                <span className="font-bold text-2xl text-primary">
                  {numPulls && tableData
                    ? (
                        tableData[
                          Object.keys(tableData)
                            .filter(k => k !== "None")
                            .at(-1) as string
                        ] as number
                      ) // Highest milestone (excluding "None")
                        .toFixed(2)
                    : "--"}
                  %
                </span>{" "}
                chance of obtaining all rewards in{" "}
                <span className="font-semibold">
                  {numPulls || "[Enter Pulls]"}
                </span>{" "}
                pulls
              </p>
            </div>
          </div>
        </Card>

        {/* Chart Card */}
        <PullChart chartData={chartData} milestoneLabels={milestoneLabels} />

        {/* Probability Table Card
        TODO: REFACTOR!!!!! */}
        {tableData && (
          <Card className="p-6 shadow-xl border-2">
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 text-lg font-semibold">
                      Target Item
                    </th>
                    <th className="text-left p-4 text-lg font-semibold">
                      Probability
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(tableData)
                    .sort(([keyA], [keyB]) => {
                      // Sort so "None" comes first, then others in order
                      if (keyA === "None") return -1;
                      if (keyB === "None") return 1;
                      return 0;
                    })
                    .map(([constellation, probability], index) => {
                      // Get the label for this constellation key directly from the mapping
                      const label =
                        milestoneLabels[constellation] || constellation;

                      return (
                        <tr
                          key={index}
                          className="border-b border-border last:border-0"
                        >
                          <td className="p-4 text-lg font-medium">{label}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-12 bg-gray-700 rounded-md overflow-hidden">
                                <div
                                  className="h-full bg-secondary flex items-center justify-center text-white font-semibold text-lg relative"
                                  style={{ width: `${probability}%` }}
                                >
                                  <span className="absolute left-4">
                                    {Number(probability).toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
