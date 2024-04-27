import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import TextAreaInput from "@/Components/TextAreaInput";

const About = () => {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            description: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };
    return (
        <section className="p-4 bg-white shadow-md rounded-md text-black">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Tentang SCOLA
                </h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Perbarui About SCOLA
                </p> */}
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    {/* <InputLabel htmlFor="email" value="Email" /> */}

                    <TextAreaInput
                        id="about"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
};

export default About;
