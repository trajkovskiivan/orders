export const prepareData = (response) => {
  //   const { tracking_number, order_id, status, origin_info } = response;
  return response?.map((data) => {
    const { tracking_number, order_id, status, origin_info } = data;
    return {
      tracking_number,
      order_id,
      status,
      shipment_date: origin_info?.ItemReceived || "",
      delivery_date:
        status === "delivered"
          ? origin_info?.trackinfo[0]?.Date
          : "not arrived",
      route: origin_info?.trackinfo?.map((item) => item.Details),
    };
  });
};
