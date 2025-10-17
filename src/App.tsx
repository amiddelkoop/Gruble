import { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./index.css";

const CELL_WIDTH = 150;
const CELL_HEIGHT = 3 * 16;

function buildGrid(rows: number, cols: number, prev?: string[][]): string[][] {
    const g: string[][] = Array.from({ length: rows }, () => Array(cols).fill(""));
    if (prev) {
        for (let r = 0; r < Math.min(rows, prev.length); r++) {
            for (let c = 0; c < Math.min(cols, prev[r].length); c++) {
                g[r][c] = prev[r][c];
            }
        }
    }
    return g;
}

export default function ResizableGrid() {
    const [rows, setRows] = useState<number>(5);
    const [cols, setCols] = useState<number>(5);
    const [grid, setGrid] = useState<string[][]>(() => buildGrid(5, 5));
    const tableId = useMemo(() => `rg-${Math.random().toString(36).slice(2)}`, []);
    const backgroundImage = useMemo(() => {
        const images = ["One.jpeg", "Two.jpeg", "Three.jpeg"];
        return images[Math.floor(Math.random() * images.length)];
    }, []);

    const resizeRows = (delta: number) => {
        setRows((prev) => {
            const next = Math.max(1, Math.min(30, prev + delta));
            setGrid((g) => buildGrid(next, cols, g));
            return next;
        });
    };

    const resizeCols = (delta: number) => {
        setCols((prev) => {
            const next = Math.max(1, Math.min(30, prev + delta));
            setGrid((g) => buildGrid(rows, next, g));
            return next;
        });
    };

    const updateCell = (r: number, c: number, value: string) => {
        setGrid((prev) => {
            const next = prev.map((row) => row.slice());
            next[r][c] = value;
            return next;
        });
    };

    const gridWidth = cols * CELL_WIDTH;
    const gridHeight = rows * CELL_HEIGHT;

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <h2>GRUBLE {rows}×{cols}</h2>
            <div
                style={{
                    padding: "2rem",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(3px)",
                }}
            >
                <div className="relative inline-block">
                    <div className="flex">
                        <table
                            id={tableId}
                            style={{ borderCollapse: "collapse" }}
                            aria-describedby={`${tableId}-desc`}
                        >
                            <caption id={`${tableId}-desc`} className="sr-only">
                                GRUBLE.
                            </caption>
                            <tbody>
                            {Array.from({ length: rows }).map((_, r) => (
                                <tr key={r}>
                                    {Array.from({ length: cols }).map((__, c) => (
                                        <td
                                            key={`${r}-${c}`}
                                            style={{
                                                padding: 0,
                                                margin: 0,
                                                width: CELL_WIDTH,
                                                height: CELL_HEIGHT,
                                            }}
                                        >
                                            <input
                                                aria-label={`Row ${r + 1}, Column ${c + 1}`}
                                                value={grid[r]?.[c] ?? ""}
                                                onChange={(e) => updateCell(r, c, e.target.value)}
                                                style={{
                                                    width: CELL_WIDTH,
                                                    height: CELL_HEIGHT,
                                                    border: "1px solid rgba(0,0,0,0.2)",
                                                    padding: "0 4px",
                                                    margin: 0,
                                                    boxSizing: "border-box",
                                                    background: "transparent",
                                                    color: "black",
                                                    outline: "none",
                                                }}
                                                onFocus={(e) => (e.target.style.outline = "none")}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: `${gridHeight}px`,
                            }}
                        >
                            <button
                                onClick={() => resizeCols(1)}
                                disabled={cols >= 30}
                                style={{
                                    height: gridHeight / 2,
                                    width: CELL_HEIGHT,
                                    background: "transparent",
                                    border: "1px solid rgba(0,0,0,0.2)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <AddIcon />
                            </button>
                            <button
                                onClick={() => resizeCols(-1)}
                                disabled={cols <= 1}
                                style={{
                                    height: gridHeight / 2,
                                    width: CELL_HEIGHT,
                                    background: "transparent",
                                    border: "1px solid rgba(0,0,0,0.2)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <RemoveIcon />
                            </button>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: `${gridWidth}px`,
                        }}
                    >
                        <button
                            onClick={() => resizeRows(1)}
                            disabled={rows >= 30}
                            style={{
                                width: gridWidth / 2,
                                height: CELL_HEIGHT,
                                background: "transparent",
                                border: "1px solid rgba(0,0,0,0.2)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <AddIcon />
                        </button>
                        <button
                            onClick={() => resizeRows(-1)}
                            disabled={rows <= 1}
                            style={{
                                width: gridWidth / 2,
                                height: CELL_HEIGHT,
                                background: "transparent",
                                border: "1px solid rgba(0,0,0,0.2)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <RemoveIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
