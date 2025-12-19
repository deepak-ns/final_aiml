import "./InfoCard.css";

export default function InfoCard() {
    return (
        <div className="info-card-container">
            <h3>Component Condition Reference</h3>
            <div className="info-grid">
                <div className="info-section">
                    <h4>Cooler Condition (%)</h4>
                    <ul>
                        <li><span className="dot red"></span> <strong>&le; 3:</strong> Close to total failure</li>
                        <li><span className="dot amber"></span> <strong>&le; 20:</strong> Reduced efficiency</li>
                        <li><span className="dot green"></span> <strong>100:</strong> Full efficiency</li>
                    </ul>
                </div>
                <div className="info-section">
                    <h4>Valve Condition (%)</h4>
                    <ul>
                        <li><span className="dot red"></span> <strong>&le; 73:</strong> Close to total failure</li>
                        <li><span className="dot orange"></span> <strong>&le; 80:</strong> Severe lag</li>
                        <li><span className="dot amber"></span> <strong>&le; 90:</strong> Small lag</li>
                        <li><span className="dot green"></span> <strong>100:</strong> Optimal switching</li>
                    </ul>
                </div>
                <div className="info-section">
                    <h4>Internal Pump Leakage</h4>
                    <ul>
                        <li><span className="dot green"></span> <strong>0:</strong> No leakage</li>
                        <li><span className="dot amber"></span> <strong>1:</strong> Weak leakage</li>
                        <li><span className="dot red"></span> <strong>2:</strong> Severe leakage</li>
                    </ul>
                </div>
                <div className="info-section">
                    <h4>Hydraulic Accumulator (bar)</h4>
                    <ul>
                        <li><span className="dot red"></span> <strong>&le; 90:</strong> Close to total failure</li>
                        <li><span className="dot orange"></span> <strong>&le; 100:</strong> Severely reduced</li>
                        <li><span className="dot amber"></span> <strong>&le; 115:</strong> Slightly reduced</li>
                        <li><span className="dot green"></span> <strong>130:</strong> Optimal pressure</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
