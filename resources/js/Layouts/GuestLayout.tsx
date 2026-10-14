import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
            <div className="flex flex-col items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <ApplicationLogo className="h-12 w-12 transition-transform group-hover:scale-105" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            NovaStore
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                            Secure Access
                        </span>
                    </div>
                </Link>
            </div>

            <div className="mt-8 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50">
                {children}
            </div>

            <div className="mt-6 text-center text-xs text-slate-400">
                &copy; {new Date().getFullYear()} NovaStore. Secured with Laravel Authentication.
            </div>
        </div>
    );
}
