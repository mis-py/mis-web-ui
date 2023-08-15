
const styles = {
    option: (provided, state) => ({
        ...provided,
        fontWeight: state.isSelected ? "bold" : "normal",
        color: state.isSelected ? "#ffffff" : "#757575",
        backgroundColor: state.isSelected ? "#1A69DF" : "#1d1d1d",
        borderRadius: "4px",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#757575",
        backgroundColor: "#1d1d1d",
    }),
    control: (base, state) => ({
        ...base,
        background: "#1d1d1d",
        color: "#757575",
        borderColor: "none",
        borderWidth: "0",
        boxShadow: state.isFocused ? null : null,
    }),
    menu: (provided) => ({
        ...provided,
        padding: 10,
        backgroundColor: "#1d1d1d",
    }),
    input: (provided) => ({
        ...provided,
        color: "#757575",
    }),
};

export default styles;
