import React,{InputHTMLAttributes, useId} from 'react'
type Inputs = {
    label?:string,
    type?:string,
    className?:string
} & InputHTMLAttributes<HTMLInputElement>
const Input = React.forwardRef<HTMLInputElement,Inputs>(function Input({
    label,
    type='text',
    className='',
    ...props
},ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>
                {label}</label>}
            <input 
            type={type}
            className={`px-3 py-2 rounded-lg 
                 text-black outline-none 
                  duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            
            />
        </div>
    )
})

export default Input