import React, { useCallback, useRef, useMemo, useEffect } from 'react';

//https://codesandbox.io/s/currying-breeze-8llqgv?from-embed

const Modal = ({open, onClose, id, header, body, buttons, container_styles = 'w-11/12 max-w-5xl'}) => {

    const labels = buttons?.map((item, index) => (
        <button className="btn btn-success btn-sm w-20" key={index} onClick={item.onClick}>{item.label}</button>
    ));

    const modalRef = useRef(null);

    // const dialogClasses = useMemo(() => {
    //     const _arr = [styles["modal"]];
    //     if (!open) _arr.push(styles["modal--closing"]);
    
    //     return _arr.join(" ");
    //   }, [open]);

    const onClick = useCallback(
        ({ target }) => {
          const { current: el } = modalRef;
          if (target === el) onClose();
        },
        [onClose]
    );

    const onCancel = useCallback(
        (e) => {
            e.preventDefault();
            onClose();
        },
        [onClose]
    );

    const onAnimEnd = useCallback(() => {
        const { current: el } = modalRef;
        if (!open) el.close();
    }, [open]);

    useEffect(() => {
        const { current: el } = modalRef;
        if (open) el.showModal();
      }, [open]);

    // document.getElementById(`history_modal_${item.id}`).showModal()
    return (
        <dialog 
            ref={modalRef}
            onClose={onClose}
            onCancel={onCancel}
            onClick={onClick}
            onAnimationEnd={onAnimEnd}
            id={id}
            className="modal"
        >
            <div className={`modal-box ${container_styles}`}>
                <h3 className="font-bold text-lg">{header}</h3>
                {body}

                <div className="modal-action justify-between">
                    {labels}
                    <form method="dialog">
                        <button className="btn w-20 btn-sm">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal;