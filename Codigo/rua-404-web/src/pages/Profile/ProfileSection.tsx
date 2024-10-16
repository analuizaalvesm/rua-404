import { FC } from "react";

type ProfileSectionProps = {
  section: "perfil" | "endereco" | "seguranca";
};

const ProfileSection: FC<ProfileSectionProps> = ({ section }) => {
  switch (section) {
    case "perfil":
      return (
        <div>
          <h2 className="font-bold text-lg mb-4">Perfil</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Primeiro nome</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Sobrenome</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">E-mail</label>
              <input type="email" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Data de nascimento</label>
              <input type="date" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CPF</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Celular</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
              Salvar
            </button>
          </form>
        </div>
      );
    case "endereco":
      return (
        <div>
          <h2 className="font-bold text-lg mb-4">Endereço</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Rua</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Número</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Complemento</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cidade</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Estado</label>
              <input type="text" className="border rounded p-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
              Salvar
            </button>
          </form>
        </div>
      );
    case "seguranca":
      return (
        <div>
          <h2 className="font-bold text-lg mb-4">Segurança</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Nova Senha</label>
              <input type="password" className="border rounded p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirmar Nova Senha</label>
              <input type="password" className="border rounded p-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
              Atualizar Senha
            </button>
          </form>
        </div>
      );
    default:
      return <div>Seção não encontrada</div>;
  }
};

export default ProfileSection;
