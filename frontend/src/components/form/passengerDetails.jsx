import React from 'react';

function Details({ isPassengerEditMode, setIsPassengerEditMode, register, errors }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-8 bg-[#fafafa]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center justify-end w-full">
                    <input 
                        type="checkbox" 
                        id="edit" 
                        className="mr-2"
                        checked={isPassengerEditMode}
                        onChange={() => setIsPassengerEditMode(!isPassengerEditMode)}
                    />
                    <label htmlFor="edit" className="text-sm text-gray-500">Edit</label>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2].map((index) => (
                    <React.Fragment key={index}>
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full p-2 border border-gray-300 rounded p-5"
                                disabled={!isPassengerEditMode}
                                {...register(`passengers.${index}.firstName`)}
                            />
                            {errors.passengers?.[index]?.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.passengers[index].firstName.message}</p>
                            )}
                        </div>
                        {index < 2 ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full p-2 border border-gray-300 rounded p-5"
                                    disabled={!isPassengerEditMode}
                                    {...register(`passengers.${index}.lastName`)}
                                />
                                {errors.passengers?.[index]?.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.passengers[index].lastName.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="border border-gray-200 rounded-lg p-5 bg-[#F4F4F3]">
                                <span className="text-sm font-medium text-gray-500">Last Name</span>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Details;