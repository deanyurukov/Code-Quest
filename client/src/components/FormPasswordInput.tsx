import { useState } from "react";

const FormPasswordInput = () => {
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    return (
        <div className="input">
            <label htmlFor="password">Password</label>

            <span className="password">
                <input type={isPassVisible ? "text" : "password"} name="password" id="password" placeholder="••••••••" required />

                {
                    isPassVisible ?
                        <svg onClick={() => setIsPassVisible(prev => prev = !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path><path d="m2 2 20 20"></path></svg> :
                        <svg onClick={() => setIsPassVisible(prev => prev = !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                }
            </span>
        </div>
    );
}

export default FormPasswordInput;