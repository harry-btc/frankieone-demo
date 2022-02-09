import "./FrankieModal.css";

const FrankieSmartUI = ({ show, onClose }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <ff-onboarding-widget />
      </section>
    </div>
  );
};

export default FrankieSmartUI;
