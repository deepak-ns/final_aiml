import "./MachineSelector.css";

export default function MachineSelector({ machines, onSelect }) {
  return (
    <div className="machine-selector-wrapper">
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Machine</option>
        {machines.map((machine) => (
          <option key={machine.machine_id} value={machine.machine_id}>
            {machine.machine_name}
          </option>
        ))}
      </select>
    </div>
  );
}
