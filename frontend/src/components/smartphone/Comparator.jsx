// src/components/Comparatore.jsx
export default function Comparator({ smartphones }) {
    if (!smartphones || smartphones.length === 0) return <p>Nessuno smartphone da confrontare.</p>;

    const caratteristiche = [
        "brand", "price", "display", "cpu", "ram", "storage", "battery", "camera", "os"
    ];

    return (
        <div className="overflow-auto">
            <table className="min-w-full border text-left">
                <thead>
                    <tr>
                        <th className="border p-2 bg-gray-100">Caratteristica</th>
                        {smartphones.map(phone => (
                            <th key={phone.id} className="border p-2 bg-gray-100">{phone.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {caratteristiche.map(key => (
                        <tr key={key}>
                            <td className="border p-2 font-semibold capitalize">{key}</td>
                            {smartphones.map(phone => (
                                <td key={phone.id + key} className="border p-2">
                                    {phone[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
