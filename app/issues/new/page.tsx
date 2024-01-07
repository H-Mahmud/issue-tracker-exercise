import dynamic from 'next/dynamic';
const IssueForm = dynamic(() => import('../_components/IssueForm'), {
  ssr: false,
});
export default async function NewIssuePage() {
  return <IssueForm />;
}
