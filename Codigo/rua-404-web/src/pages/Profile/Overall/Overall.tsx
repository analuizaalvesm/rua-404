const Overall = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Visão Geral</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 px-4 py-6 rounded-lg flex flex-row justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-green-800">85</p>
            <p className="font-regular text-gray-500">Jobs concluídos</p>
          </div>
          <div className="bg-white p-3 rounded-md">
            {/* <PiIdentificationCard size={32} color={"#4d7c0f"} /> */}
          </div>
        </div>
        <div className="bg-blue-100 px-4 py-6 rounded-lg flex flex-row justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-blue-800">18</p>
            <p className="font-regular text-gray-500">Jobs abertos</p>
          </div>
          <div className="bg-white p-3 rounded-md">
            {/* <PiBriefcase size={32} color={"#1e40af"} /> */}
          </div>
        </div>
        <div className="bg-yellow-100 px-4 py-6 rounded-lg flex flex-row justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-yellow-800">413</p>
            <p className="font-regular text-gray-500">Candidatos salvos</p>
          </div>
          <div className="bg-white p-3 rounded-md">
            {/* <PiBookmarkSimple size={32} color={"#a16207"} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overall;
