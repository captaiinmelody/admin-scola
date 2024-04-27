import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useState } from "react";
import TextInput from "@/Components/TextInput";

const Rekening = ({ className }: { className?: string }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            bank_name: "",
            bank_account_name: "",
            bank_account_number: "",
        });

    const [isAddNewAccount, setIsAddNewAccount] = useState(false);

    const handleAddNewAccount = () => {
        setIsAddNewAccount(!isAddNewAccount);
    };

    const handleCancelAddNewAccount = () => {
        setIsAddNewAccount(!isAddNewAccount);
        setData({
            bank_name: "",
            bank_account_name: "",
            bank_account_number: "",
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };
    return (
        <section
            className={`p-4 bg-white shadow-md rounded-md text-black ${className}`}
        >
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Rekening SCOLA
                </h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Perbarui Rekening SCOLA
                </p> */}
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {isAddNewAccount ? (
                    <div className="flex items-center gap-4">
                        <div>
                            <InputLabel htmlFor="bank_name" value="Nama Bank" />

                            <TextInput
                                id="bank_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.bank_name}
                                onChange={(e) =>
                                    setData("bank_name", e.target.value)
                                }
                                // autoComplete="username"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.bank_name}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="bank_account_name"
                                value="Nama Pemilik Rekening"
                            />

                            <TextInput
                                id="bank_account_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.bank_account_name}
                                onChange={(e) =>
                                    setData("bank_account_name", e.target.value)
                                }
                                // autoComplete="username"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.bank_account_name}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="bank_account_number"
                                value="Nama Bank"
                            />

                            <TextInput
                                id="bank_account_number"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.bank_account_number}
                                onChange={(e) =>
                                    setData(
                                        "bank_account_number",
                                        e.target.value
                                    )
                                }
                                // autoComplete="username"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.bank_account_number}
                            />
                        </div>
                        <div className="flex items-center gap-4 mt-5">
                            <PrimaryButton
                                disabled={processing}
                                type="submit"
                                className="py-3"
                            >
                                Save
                            </PrimaryButton>

                            <PrimaryButton
                                type="button"
                                onClick={handleCancelAddNewAccount}
                                className="bg-tertiary py-3"
                            >
                                Cancel
                            </PrimaryButton>

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
                    </div>
                ) : (
                    <PrimaryButton type="button" onClick={handleAddNewAccount}>
                        Tambah Rekening Baru
                    </PrimaryButton>
                )}
            </form>
        </section>
    );
};

export default Rekening;
