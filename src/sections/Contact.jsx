import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef()

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

            setLoading(true);

        try {
            await emailjs.send(
                'service_opv5h78',
                'template_w1m5ax1',
                {
                    from_name: form.name,
                    to_name: 'Nícolas',
                    from_email: form.email,
                    to_email: 'nicolasps.contato@gmail.com',
                    message: form.message
                },
                'QaemHRK3_mTcz3M8o'
            )
            setLoading(false)
            alert('Your message has been sent!')

            setForm({
                name: '',
                email: '',
                message: '',
            });

        } catch (error) {
            setLoading(false)
            console.error(error)
            console.log(error)
            alert('Something went wrong!')
        }
    }

    return (
        <section className="c-space my-20" id="contact">
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen" />
                <div className="contact-container">
                    <h3 className="head-text">Let&apos;s Talk</h3>
                    <p className="text-lg text-white-600 mt-3">
                        If you&apos;re looking for someone who is disposed to
                        learn a new technology, turn problems into digital
                        solutions, or create an innovative project, I&apos;m here to help.
                    </p>
                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className='space-y-3'>
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="Nicolas Santos"
                            />
                        </label>
                        <label className='space-y-3'>
                            <span className="field-label">E-mail</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="NicolasSantos@gmail.com"
                            />
                        </label>
                        <label className='space-y-3'>
                            <span className="field-label">Your message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder="Hi, I'm interested in..."
                            />
                        </label>

                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact

//'service_opv5h78'
//'template_8vd2x6z'
//'QaemHRK3_mTcz3M8o'
//If you're looking for someone who is disposed to
//learn a new technology, turn problems into digital
//solutions, or create an innovative project, I'm here to help.