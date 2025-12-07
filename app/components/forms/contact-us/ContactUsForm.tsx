
export default function ContactUsForm() {
  return (
    <form action="" className="flex flex-col gap-4">
      <div className="flex gap-4 max-w-xl justify-between">
        <InputField
          label="Full Name"
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
        />
        <InputField
          label="Email Address"
          type="text"
          name="email"
          id="email"
          placeholder="email@website.com"
        />
        {/* <div className="flex flex-col w-full">
          <label htmlFor="name" className="text-slate-500 uppercase text-xs">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-linear-to-b from-slate-100 to-slate-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15),inset_0_-1px_1px_rgba(255,255,255,0.7)] placeholder:text-gray-400 text-gray-700"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@website.com"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-linear-to-b from-slate-100 to-slate-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15),inset_0_-1px_1px_rgba(255,255,255,0.7)] placeholder:text-gray-400 text-gray-700"
          />
        </div> */}
      </div>
      <div className="flex flex-col max-w-xl">
        <InputField
          label="Message"
          type="textarea"
          name="message"
          id="message"
          placeholder="Type your message..."
        />
        {/* <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Type your message..."
          className="w-full px-4 py-3 rounded-md border border-gray-300 bg-linear-to-b from-slate-100 to-slate-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15),inset_0_-1px_1px_rgba(255,255,255,0.7)] placeholder:text-gray-400 text-gray-700 resize-y"
        /> */}
      </div>
      <button
        type="button"
        // className='max-w-1/3 bg-[#FFA273] hover:bg-orange-400 hover:shadow-xl cursor-pointer transition p-4 font-medium'
        className='max-w-1/3 bg-violet-100 hover:bg-violet-200 border border-violet-200 hover:shadow-xl cursor-pointer transition p-4 font-medium'
      >
        Send message
      </button>
    </form>
  )
}

type InputFieldProps = {
  label: string
  type: string
  id: string
  name: string
  placeholder: string
}

const styles = "w-full px-4 py-3 rounded-md border border-gray-300 bg-linear-to-b from-slate-100 to-slate-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15),inset_0_-1px_1px_rgba(255,255,255,0.7)] placeholder:text-gray-400 text-gray-700 border border-indigo-200"

function InputField({
  label,
  type,
  id,
  name,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-slate-500 uppercase text-xs">{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className={styles}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={styles}
        />
      )}
    </div>
  )
}
