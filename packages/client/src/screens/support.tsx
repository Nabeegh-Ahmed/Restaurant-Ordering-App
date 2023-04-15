import MainLayout from "../layouts/mainLayout"

const Support = () => {
    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 py-4">
                <div className="text-2xl font-bold">Support</div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae architecto iste quasi odit alias maxime consectetur porro quibusdam id commodi hic, sapiente eligendi incidunt quo cumque facilis eum! Dolorum, amet! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis deleniti quia minus non sequi voluptate facere dolore voluptatum quidem, voluptatem, atque quis itaque earum eius illo corporis. Iure, atque culpa.</p>

                <div className="text-2xl font-bold">Contact Us</div>
                <form className="flex flex-col">
                    <input 
                        className="my-2 bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white"
                        placeholder="Full name"    
                        type="text"
                    />
                    <input 
                        className="my-2 bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white"
                        placeholder="Email"    
                        type="email"
                    />
                    <textarea 
                        rows={10}
                        placeholder="Message"
                        className="mt-2 bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white"
                    ></textarea>

                    <button className="bg-primary rounded-md p-2 text-xl uppercase mt-4">Send</button>
                </form>

                <div className="w-full">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.551346401678!2d74.30082541472309!3d31.48152575621003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore!5e0!3m2!1sen!2s!4v1680638031902!5m2!1sen!2s" width="100%" height="450"  loading="lazy"></iframe>
                </div>
            </div>
        </MainLayout>
    )
}

export default Support