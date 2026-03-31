type Props = {
  params: { locale: string };
};

export default function LocaleHomePage({ params }: Props) {
  return <div>Alcotheque - Coming Soon [{params.locale}]</div>;
}
