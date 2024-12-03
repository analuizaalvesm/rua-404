import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsTab from "./Events/Events";
import CollabsTab from "./Collabs/Collabs";
import CollectionsTab from "./Colecoes/Colecoes";

const CMSPage = () => {
  return (
    <div className="max-w-full">
      <h1 className="text-2xl font-bold mb-4">
        Sistema de Gerenciamento de Conteúdo
      </h1>

      <Tabs defaultValue="events">
        <TabsList className="mb-2.5 bg-transparent w-full">
          <div className="border-b border-gray-200 w-full">
            <TabsTrigger
              value="events"
              className="data-[state=active]:border-black data-[state=active]:text-black bg-transparent inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg transition-colors hover:text-black hover:border-black dark:hover:text-gray-300"
            >
              Eventos
            </TabsTrigger>
            <TabsTrigger
              value="collabs"
              className="data-[state=active]:border-black data-[state=active]:text-black bg-transparent inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg transition-colors hover:text-black hover:border-black dark:hover:text-gray-300"
            >
              Colaborações
            </TabsTrigger>
            <TabsTrigger
              value="collections"
              className="data-[state=active]:border-black data-[state=active]:text-black bg-transparent inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg transition-colors hover:text-black hover:border-black dark:hover:text-gray-300"
            >
              Coleções
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="events">
          <EventsTab />
        </TabsContent>

        <TabsContent value="collabs">
          <CollabsTab />
        </TabsContent>

        <TabsContent value="collections">
          <CollectionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CMSPage;
