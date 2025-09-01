import { Container } from "../../shared/components/shared/container";
import { ProductsGroupList } from "../../shared/components/shared/products-group-list";
import { Title } from "../../shared/components/shared/title";
import { TopBar } from "../../shared/components/shared/top-bar";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";
import { Filter } from "@/shared/components/shared/filter";
import { StoriesGroup } from "@/shared/components/shared/stories-group";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);
  return (
    <>
      <Container className="md:mt-10 mt-4">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <StoriesGroup />
      <Container className="pb-14 mt-9">
        <div className="flex gap-[80px]">
          {/*Фильтрация*/}
          <Filter />
          {/*Товары*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      products={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
        <div></div>
      </Container>
    </>
  );
}
