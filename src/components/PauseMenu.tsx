import { useState } from "react";

interface PauseMenuProps {
  onClose: () => void;
  onReturnToMainMenu: () => void;
}

export default function PauseMenu({
  onClose,
  onReturnToMainMenu,
}: PauseMenuProps) {
  const [showWarning, setShowWarning] = useState(false);

  const handleReturnToMainMenu = () => {
    setShowWarning(true);
  };

  const handleConfirmReturn = () => {
    onReturnToMainMenu();
    setShowWarning(false); // Hide the warning popup
  };

  const handleCancelReturn = () => {
    setShowWarning(false);
  };

  return (
    <div className="pause-menu">
      <div className="pause-menu-content">
        <h2 className="text-2xl">Pause Menu</h2>
        {/* Button placed at the top right */}
        <button onClick={onClose} className="btn btn-close top-right">
          Close
        </button>
        <button onClick={handleReturnToMainMenu} className="btn btn-main-menu center-screen">
          Return to Main Menu
        </button>
      </div>

      {showWarning && (
        <div className="warning-popup">
          <div className="warning-content">
            <h3 className="text-xl">Warning</h3>
            <p>Your progress will not be saved if you return to the main menu. Are you sure?</p>
            <div className="warning-actions">
              <button onClick={handleConfirmReturn} className="btn btn-confirm">
                Yes, Return
              </button>
              <button onClick={handleCancelReturn} className="btn btn-cancel">
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
