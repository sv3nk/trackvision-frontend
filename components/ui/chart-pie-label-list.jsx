"use client"
import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart, Legend } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const colors = ['#003a7d', '#008dff', '#ff73b6', '#c701ff', '#4ecb8d', '#ff9d3a', '#f9e858', '#d83034']

export function ChartPieLabelList({ data }) {

    let customChartConfig = {
        percentage: {
            label: "Percentage",
        },
    }

    for (let set in data) {

        // Code values in our data contain - which is not acceptable as object properties
        const code = data[set].code
        const cleanCode = code.replace('-', '')
        data[set].code = cleanCode

        const percentageFloat = parseFloat(data[set].percentage)
        data[set].percentage = percentageFloat;
        if (set < colors.length) {
            data[set].fill = colors[set]
        } else {
            data[set].fill = '#ffffff'
        }

        let obj = {
            label: data[set].ingredient,
            percentage: data[set].percentage,
            color: "var(--chart-3)",
        }

        customChartConfig[cleanCode] = obj;
    }

    return (
        <Card className="flex flex-row border-none shadow-none gap-2">
            <div className="">
                Legend if possible
            </div>
            <CardContent className="flex-1">
                <ChartContainer
                    config={customChartConfig}
                    className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={data} dataKey="percentage" nameKey="ingredient" innerRadius={60} minAngle={1} activeShape={{
                            fill: 'red',
                        }}>
                            <LabelList
                                dataKey="code"
                                className="fill-background font-medium"
                                stroke="none"
                                fontSize={12}
                                formatter={(value) => {
                                    if (customChartConfig[value]?.percentage > 5) {
                                        return customChartConfig[value]?.percentage + '%'
                                    } else {
                                        return ''
                                    }
                                }
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}