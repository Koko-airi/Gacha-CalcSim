"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { figtree } from "@/lib/fonts";
import PullPlan from "./_components/PullPlan";
import PullChart from "./_components/PullChart";
import usePullPlan from "@/hooks/usePullPlan";
import {
  findProbabilityForPullCount,
  getExactFeaturedRates,
  parseRatesForGraph,
} from "@/lib/algorithms/calculator";

export default function CalculatorPage() {
  /* We import the pull plan state from the custom hook here.
   * This will give us access to the current pull plan slots.
   * We need this to make calculations for the graph and table,
   * hence why we import here instead of in the PullPlan component.
   */

  const pullPlanState = usePullPlan();

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

  // Recalculate rates when pull plan changes
  useEffect(() => {
    const slot1 = pullPlanState[0][0];
    const target = slot1.target;
    const current = slot1.current;
    let calculatedOffset =
      current === "None" ? 0 : Number(current.slice(1)) + 1;

    setOffset(calculatedOffset);

    if (slot1.type === "Weapon" && slot1.current === "None") calculatedOffset++; // Weapon constellations start at r1

    const calculatedRates = getExactFeaturedRates(
      Number(target.slice(1)) + 1 - calculatedOffset,
      slot1.type.charAt(0)
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
  }, [pullPlanState[0]]);

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
            Gacha Calculator
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
                          Object.keys(tableData).at(-2) as string
                        ] as number
                      ) // Highest constellation
                        .toFixed(2)
                    : "--"}
                  %
                </span>{" "}
                chance of obtaining rewards in{" "}
                <span className="font-semibold">
                  {numPulls || "[Enter Pulls]"}
                </span>{" "}
                pulls
              </p>
            </div>
          </div>
        </Card>

        {/* Chart Card */}
        <PullChart chartData={chartData} />

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
                  {Object.entries(tableData).map(
                    ([constellation, probability], index) => (
                      <tr
                        key={index}
                        className="border-b border-border last:border-0"
                      >
                        <td className="p-4 text-lg font-medium">
                          {constellation}
                        </td>
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
                    )
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
