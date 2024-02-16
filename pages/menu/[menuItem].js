import Layout from "../layout";

function MenuItem({ data, error }) {
  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (!data) {
    return <p>Restaurant not found</p>; // Handle non-existent post as well
  }

  return (
    <div>
      <Layout>
        <div className="p-20">
          <p>{data.restaurant_name}</p>
          <p>{data.item_name}</p>
          <p>{data.price}</p>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ context }) {
  const { MenuItemId } = context.query || {};

  let data = null;
  let error = null;

  try {
    const response = await axios.get(
      `https://fooddelivery-kappa.vercel.app/api/menus?menuItemId=${MenuItemId}`
    );

    data = response.data;
  } catch (err) {
    error = err.message;
  }

  return {
    props: {
      data,
      error,
    },
  };
}

export default MenuItem;
