const BreakfastImage = () => {
  return (
    <img
      sizes="(max-width: 1400px) 100vw, 1400px"
      srcSet="
oatmeal-2400x1800_jtoioy_c_scale,w_200.jpg 200w,
oatmeal-2400x1800_jtoioy_c_scale,w_531.jpg 531w,
oatmeal-2400x1800_jtoioy_c_scale,w_752.jpg 752w,
oatmeal-2400x1800_jtoioy_c_scale,w_930.jpg 930w,
oatmeal-2400x1800_jtoioy_c_scale,w_1087.jpg 1087w,
oatmeal-2400x1800_jtoioy_c_scale,w_1232.jpg 1232w,
oatmeal-2400x1800_jtoioy_c_scale,w_1349.jpg 1349w,
oatmeal-2400x1800_jtoioy_c_scale,w_1400.jpg 1400w"
      src="oatmeal-2400x1800_jtoioy_c_scale,w_1400.jpg"
      alt=""
      className="w-full max-h-[140px] md:max-h-[200px] object-cover"
    />
  );
};

const LunchImage = () => {
  return (
    <img
      sizes="(max-width: 1400px) 100vw, 1400px"
      srcSet="
salad-2400x1600_f8rqhc_c_scale,w_200.jpg 200w,
salad-2400x1600_f8rqhc_c_scale,w_490.jpg 490w,
salad-2400x1600_f8rqhc_c_scale,w_690.jpg 690w,
salad-2400x1600_f8rqhc_c_scale,w_907.jpg 907w,
salad-2400x1600_f8rqhc_c_scale,w_1070.jpg 1070w,
salad-2400x1600_f8rqhc_c_scale,w_1245.jpg 1245w,
salad-2400x1600_f8rqhc_c_scale,w_1378.jpg 1378w,
salad-2400x1600_f8rqhc_c_scale,w_1400.jpg 1400w"
      src="salad-2400x1600_f8rqhc_c_scale,w_1400.jpg"
      alt=""
      className="w-full max-h-[140px] md:max-h-[200px] object-cover"
    />
  );
};

const DinnerImage = () => {
  return (
    <img
      sizes="(max-width: 1400px) 100vw, 1400px"
      srcSet="
noodle-bowl-1920x1289_ry5zd3_c_scale,w_200.jpg 200w,
noodle-bowl-1920x1289_ry5zd3_c_scale,w_572.jpg 572w,
noodle-bowl-1920x1289_ry5zd3_c_scale,w_830.jpg 830w,
noodle-bowl-1920x1289_ry5zd3_c_scale,w_1044.jpg 1044w,
noodle-bowl-1920x1289_ry5zd3_c_scale,w_1345.jpg 1345w,
noodle-bowl-1920x1289_ry5zd3_c_scale,w_1400.jpg 1400w"
      src="noodle-bowl-1920x1289_ry5zd3_c_scale,w_1400.jpg"
      alt=""
      className="w-full max-h-[140px]  md:max-h-[200px] object-cover"
    />
  );
};

const AllImage = () => {
  return (
    <img
      srcSet="food-prep-400w.jpg 400w, food-prep-640w.jpg 640w, food-prep-1920w.jpg 1920w"
      sizes="(max-width: 600px) 400px, (max-width: 1000px) 640px, 1920w"
      src="food-prep-1920w.jpg"
      alt="Food preparation"
      className="w-full max-h-[140px] md:max-h-[200px] object-cover"
    />
  );
};

const DessertImage = () => {
  return (
    <img
      sizes="(max-width: 1400px) 100vw, 1400px"
      srcset="
dessert_qfpfrm_c_scale,w_200.jpg 200w,
dessert_qfpfrm_c_scale,w_915.jpg 915w,
dessert_qfpfrm_c_scale,w_1400.jpg 1400w"
      src="dessert_qfpfrm_c_scale,w_1400.jpg"
      alt=""
      className="w-full max-h-[140px] md:max-h-[200px] object-cover"
    />
  );
};

export { BreakfastImage, LunchImage, DinnerImage, AllImage, DessertImage };
