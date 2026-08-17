const FormInput = ({ label, type, name, placeholder }: { label: string, type: string, name: string, placeholder: string }) => {
    return (
        <div className="input">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} required />
        </div>
    );
}

export default FormInput;