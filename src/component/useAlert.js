const useAlert = ( message = null, onConfirm ) => {
    if (!onConfirm || typeof onConfirm !== "function") {
        return;
      }

      const alertAction = () => {
        if (window.confirm(message)) {
          onConfirm();
        } else {
          onCancel();
        }
      };

      return confirmAction;
}

export default useAlert;