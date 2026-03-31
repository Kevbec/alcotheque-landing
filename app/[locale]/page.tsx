import { setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

// Page d’accueil volontairement vide : le contenu sera ajouté plus tard.
export default function HomePage({ params }: Props) {
  setRequestLocale(params.locale);
  return null;
}
