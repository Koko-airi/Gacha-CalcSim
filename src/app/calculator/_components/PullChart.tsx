"use client";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";

const chartConfig = {
  c0: {
    label: "c0",
    color: "#10b981",
  },
  c1: {
    label: "c1",
    color: "#0090ff",
  },
  c2: {
    label: "c2",
    color: "#ef73dd",
  },
  c3: {
    label: "c3",
    color: "#ff9f00",
  },
  c4: {
    label: "c4",
    color: "#ff3b3b",
  },
  c5: {
    label: "c5",
    color: "#8b5cf6",
  },
  c6: {
    label: "c6",
    color: "#f43f5e",
  },
  r1: {
    label: "r1",
    color: "#10a0ff",
  },
  r2: {
    label: "r2",
    color: "#ff83dd",
  },
  r3: {
    label: "r3",
    color: "#ffaf20",
  },
  r4: {
    label: "r4",
    color: "#ff4b4b",
  },
  r5: {
    label: "r5",
    color: "#9b6cf6",
  },
  r6: {
    label: "r6",
    color: "#f44f6f",
  },
} satisfies ChartConfig;

export default function PullChart({
  chartData,
  milestoneLabels,
}: {
  chartData: Record<string, string | number>[];
  milestoneLabels?: Record<string, string>;
}) {
  // Build dynamic chart config based on available data keys
  const dynamicChartConfig: ChartConfig = {};

  if (chartData && chartData.length > 0) {
    const dataKeys = Object.keys(chartData[0]).filter(key => key !== "pulls");

    dataKeys.forEach((key, index) => {
      // Use the base chartConfig color if it exists, otherwise use a fallback
      const baseConfig = chartConfig[key as keyof typeof chartConfig];
      const label = milestoneLabels?.[key] || key;

      dynamicChartConfig[key] = {
        label: label,
        color:
          baseConfig?.color ||
          `hsl(${(index * 360) / dataKeys.length}, 70%, 50%)`,
      };
    });
  }

  return (
    <Card className="p-6 shadow-xl border-2">
      <div className="h-[400px] w-full">
        {chartData && chartData.length > 0 ? (
          <ChartContainer config={dynamicChartConfig} className="h-full w-full">
            <AreaChart data={chartData}>
              <CartesianGrid className="stroke-muted" />
              <XAxis
                dataKey="pulls"
                label={{
                  value: "Number of Pulls",
                  position: "insideBottom",
                  offset: -5,
                }}
                className="text-muted-foreground"
              />
              <YAxis
                label={{
                  value: "Pull Chance (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
                className="text-muted-foreground"
              />
              <ChartTooltip
                content={<ChartTooltipContent className="rounded-2xl p-3" />}
              />
              {Object.keys(chartData[0]).map(key => {
                if (key === "pulls") return null;
                const config = dynamicChartConfig[key];
                return (
                  <Area
                    key={key}
                    dataKey={key}
                    fill={config.color}
                    stroke={config.color}
                    fillOpacity={0.06}
                    strokeWidth={4}
                    dot={false}
                  />
                );
              })}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="relative h-full">
            <p className="absolute text-center text-gray-400 text-2xl bottom-1/2 left-1/2 -translate-x-1/2">
              Please enter the number of pulls to see the chart.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
