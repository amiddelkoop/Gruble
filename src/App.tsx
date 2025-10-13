import { useMemo, useState } from "react";

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
    const [size, setSize] = useState<number>(5);
    const [grid, setGrid] = useState<string[][]>(() => buildGrid(5, 5));

    const tableId = useMemo(() => `rg-${Math.random().toString(36).slice(2)}`,[ ]);

    const resize = (delta: number) => {
        setSize((prev) => {
            const next = Math.max(1, Math.min(30, prev + delta));
            setGrid((g) => buildGrid(next, next, g));
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

    const clearAll = () => setGrid(buildGrid(size, size));

    return (
        <div className="rg-container">
            <div className="rg">
                <h2>GRUBLE {size}×{size}</h2>
                <div className="rg-controls" role="group" aria-label="Resize grid">
                    <button onClick={() => resize(-1)} disabled={size <= 1} aria-label="Decrease size">−</button>
                    <span className="rg-size" aria-live="polite" aria-atomic="true">{size} × {size}</span>
                    <button onClick={() => resize(1)} disabled={size >= 30} aria-label="Increase size">+</button>
                    <button onClick={clearAll} title="Clear all cells">Clear</button>
                </div>

                <table id={tableId} className="rg-table" aria-describedby={`${tableId}-desc`}>
                    <caption id={`${tableId}-desc`}>GRUBLE.</caption>
                    <tbody>
                    {Array.from({ length: size }).map((_, r) => (
                        <tr key={r}>
                            {Array.from({ length: size }).map((__, c) => (
                                <td key={`${r}-${c}`}>
                                    <label className="rg-cell">
                                        <input
                                            aria-label={`Row ${r + 1}, Column ${c + 1}`}
                                            value={grid[r]?.[c] ?? ""}
                                            onChange={(e) => updateCell(r, c, e.target.value)}
                                        />
                                    </label>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}