export type EventFormType = {
  idEvento?: number;
  name: string;
  texto: string;
  url: string;
  imgUrl: string;
};

export type CollectionFormType = {
  id: number;
  name: string;
  texto: string;
};

export type CommonFormType = {
  id?: number | null;
  name: string;
  texto: string;
  url: string;
};

export type BannerFormData = {
  id: number;
  texto: string;
  descricao: string;
};
