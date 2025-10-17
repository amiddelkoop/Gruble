import { useMemo, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./index.css";

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
    const [isMobile, setIsMobile] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState("Three.jpeg");

    useEffect(() => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        setBackgroundImage(mobile ? "Two.jpeg" : "Three.jpeg");
    }, []);

    const tableId = useMemo(() => `rg-${Math.random().toString(36).slice(2)}`, []);

    const CELL_WIDTH = isMobile ? 60 : 150;
    const CELL_HEIGHT = isMobile ? 38 : 48;

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

    const spacing = 1;
    const gridWidth = cols * CELL_WIDTH + (cols - 1) * spacing;
    const gridHeight = rows * CELL_HEIGHT + (rows - 1) * spacing;

    const gap = isMobile ? 3 : 6;
    const rightButtonHeight = (gridHeight - gap) / 2;

    return (
        <main
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                padding: isMobile ? "0.3rem" : "2rem",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            <h1
                style={{
                    fontSize: isMobile ? "18px" : "32px",
                    marginBottom: isMobile ? "0.5rem" : "1.5rem",
                }}
            >
                GRUBLE {rows}×{cols}
            </h1>

            <section
                style={{
                    width: isMobile ? "90vw" : "auto",
                    maxWidth: "95vw",
                    maxHeight: "85vh",
                    overflow: "auto",
                    padding: isMobile ? "0.5rem" : "2rem",
                    borderRadius: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(3px)",
                    boxSizing: "border-box",
                }}
            >
                <section
                    className="relative inline-block"
                    style={{
                        borderRadius: "16px",
                        padding: "4px",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <div
                            style={{
                                width: `${gridWidth}px`,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                            }}
                        >
                            <table
                                id={tableId}
                                style={{
                                    borderCollapse: "separate",
                                    borderSpacing: `${spacing}px`,
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    width: "100%",
                                }}
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
                                                        fontSize: isMobile ? "13px" : "24px",
                                                        margin: 0,
                                                        boxSizing: "border-box",
                                                        background: "transparent",
                                                        color: "black",
                                                        fontFamily: "'Bebas Neue', sans-serif",
                                                        outline: "none",
                                                        borderRadius: "8px",
                                                    }}
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
                                    gap: `${gap}px`,
                                    width: "100%",
                                    marginTop: "6px",
                                }}
                            >
                                <button
                                    onClick={() => resizeRows(1)}
                                    disabled={rows >= 30}
                                    style={{
                                        flex: 1,
                                        height: CELL_HEIGHT,
                                        background: "transparent",
                                        border: "1px solid rgba(0,0,0,0.2)",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <AddIcon fontSize={isMobile ? "small" : "medium"} />
                                </button>
                                <button
                                    onClick={() => resizeRows(-1)}
                                    disabled={rows <= 1}
                                    style={{
                                        flex: 1,
                                        height: CELL_HEIGHT,
                                        background: "transparent",
                                        border: "1px solid rgba(0,0,0,0.2)",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <RemoveIcon fontSize={isMobile ? "small" : "medium"} />
                                </button>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: `${gridHeight}px`,
                                marginLeft: "6px",
                            }}
                        >
                            <button
                                onClick={() => resizeCols(1)}
                                disabled={cols >= 30}
                                style={{
                                    height: rightButtonHeight,
                                    width: CELL_HEIGHT,
                                    marginBottom: `${gap}px`,
                                    background: "transparent",
                                    border: "1px solid rgba(0,0,0,0.2)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                <AddIcon fontSize={isMobile ? "small" : "medium"} />
                            </button>
                            <button
                                onClick={() => resizeCols(-1)}
                                disabled={cols <= 1}
                                style={{
                                    height: rightButtonHeight,
                                    width: CELL_HEIGHT,
                                    background: "transparent",
                                    border: "1px solid rgba(0,0,0,0.2)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                <RemoveIcon fontSize={isMobile ? "small" : "medium"} />
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
}
