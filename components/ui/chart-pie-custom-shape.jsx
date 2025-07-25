"use client"
import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart, Legend, Sector } from "recharts"
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
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart"

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
}) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle || 1));
    const cos = Math.cos(-RADIAN * (midAngle || 1));
    const sx = (cx || 0) + ((outerRadius || 0) + 10) * cos;
    const sy = (cy || 0) + ((outerRadius || 0) + 10) * sin;
    const mx = (cx || 0) + ((outerRadius || 0) + 30) * cos;
    const my = (cy || 0) + ((outerRadius || 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-medium">
                {payload.value}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector className="hidden md:block"
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius || 0) + 6}
                outerRadius={(outerRadius || 0) + 10}
                fill={fill}
            />
            <path className="hidden md:block" d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle className="hidden md:block" cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text className="font-medium hidden md:block" x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${payload.ingredient} ${value}%`}</text>
        </g>
    );
};

const colors = ['#003a7d', '#008dff', '#ff73b6', '#c701ff', '#4ecb8d', '#ff9d3a', '#f9e858', '#d83034']

export function ChartPieCustomShape({ data }) {

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
        <Card className="border-none shadow-none">
            <CardContent className="flex-1">
                <ChartContainer
                    config={customChartConfig}
                    className="[&_.recharts-text]:fill-background min-h-[400px] max-h-[400px] w-full"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent className='md:hidden' hideLabel />}
                        />
                        <Pie data={data}
                            dataKey="percentage"
                            nameKey="ingredient"
                            innerRadius={60}
                            outerRadius={120}
                            minAngle={1}
                            activeShape={renderActiveShape}
                        >
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