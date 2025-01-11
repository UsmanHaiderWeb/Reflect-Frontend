'use server'

const FormFieldError = ({message}: {message: string}) => {
    return (
        <p className="text-red-500 text-sm">{ message || '' }</p>
    )
}

export default FormFieldError