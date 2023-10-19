/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { api } from "~/utils/api";

export default function Film() {
  const utils = api.useContext();

  // const { data: allData } = api.film.getAll.useQuery();
  // const { data: byIdData } = api.film.getById.useQuery({ id: 1346123465 });
  // const { data: byIdOrThrowData } = api.film.getByIdOrThrow.useQuery({
  //   id: 1346123465,
  // });
  // const { data: firstData } = api.film.getFirst.useQuery({ duration: 87 });
  // const { data: allWithDurationData } = api.film.getAllWithDuration.useQuery({
  //   duration: 87,
  // });
  // const { data: allWithDurationOverData } =
  //   api.film.getAllWithDurationOver.useQuery({
  //     duration: 87,
  //   });

  // const { data: allWithMultipleWhere } =
  //   api.film.getAllWithMultipleWhere.useQuery({
  //     duration: 130,
  //   });

  // const { data: allWithNOT } = api.film.getAllWithNOT.useQuery({
  //   duration: 130,
  // });
  const { data: allWithSome } = api.film.getAllWithSome.useQuery();
  // console.log(allData);
  // console.log(byIdData);
  // console.log(byIdOrThrowData);
  // console.log(firstData);
  // console.log(allWithDurationData);
  // console.log(allWithDurationOverData);
  // console.log(allWithMultipleWhere);
  // console.log(allWithNOT);
  console.log(allWithSome);

  const updateFilm = api.film.updateAllWithDuration.useMutation({
    onSettled: () => utils.film.getAllWithDuration.invalidate(),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateFilm.mutateAsync({
      duration: +event.currentTarget.inputName.value,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" id="inputName" />
        <button type="submit">Update Film</button>
      </form>
    </div>
  );
}
