export default function ReviewerSkeleton() {
    return (
        <div className="space-y-4">
            {/* Loading for review cards */}
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse"
                >
                    {/* User Info Loading */}
                    <div className="flex items-start mb-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                            </div>
                            <div className="flex items-center mt-1">
                                <div className="h-5 bg-gray-200 rounded-full w-16 mr-2"></div>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <div
                                            key={star}
                                            className="w-4 h-4 bg-gray-200 rounded"
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Text Loading */}
                    <div className="pl-13 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
