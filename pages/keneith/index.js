export async function getStaticProps() {
  const response = await fetch(
    "https://fooddelivery-kappa.vercel.app/api/categories"
  );
  try {
    const responseData = response.data;
    return {
      props: {
        categorie: responseData.all,
      },
    };
  } catch (error) {
    console.log("erroe fetch data", error);
    return {
      props: {
        categorie: [],
      },
    };
  }
}

export default function index({ categorie }) {
  return (
    <div>
      {categorie.map((ct) => (
        <p>{ct.category}</p>
      ))}
    </div>
  );
}
