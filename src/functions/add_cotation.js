import axios from "axios";

export const login = {
  token: localStorage.getItem("token"),
  login: localStorage.getItem("login"),
  user: JSON.parse(localStorage.getItem("myaccount")),
};

const user_id = JSON.parse(localStorage.getItem("myaccount"))?.user_id;
console.log(user_id)
export const addContation = async (searchRate) => {
  console.log(login.login);
  if (login.login || (login.user && login.user.type != "admin")) {
    let data = "";
    if (searchRate.cargo == "lcl") {
      data = JSON.stringify({
        shipping_type: searchRate.shipping_type,
        user_id: user_id,
        origin_location_name: searchRate.origin,
        origin_type: searchRate.locationOriginType,
        destination_type: searchRate.locationDestinationType,
        destination_location_name: searchRate.destination,
        cargo: searchRate.cargo,
        length: searchRate.TL,
        width: searchRate.TWL,
        height: searchRate.TH,
        weight: searchRate.TW,
        destination_code: searchRate.destination_code,
        origin_code: searchRate.origin_code,
        countery_code_origin: searchRate.countery_code_origin,
        countery_code_destination: searchRate.countery_code_destination,
        description: "",
      });
      console.log(data)
    } else if (searchRate.cargo == "fcl") {
      data = JSON.stringify({
        shipping_type: searchRate.shipping_type,
        user_id: user_id,
        origin_location_name: searchRate.origin,
        origin_type: searchRate.locationOriginType,
        destination_type: searchRate.locationDestinationType,
        destination_location_name: searchRate.destination,
        cargo: searchRate.cargo,
        destination_code: searchRate.destination_code,
        origin_code: searchRate.origin_code,
        countery_code_origin: searchRate.countery_code_origin,
        countery_code_destination: searchRate.countery_code_destination,
        container_data: searchRate.container_data,
        description: "",
      });
    }
    // console.log("ereasdsdr")

    if (searchRate.cargo == "non_has") {
      data = JSON.stringify({
        shipping_type: searchRate.shipping_type,
        user_id: user_id,
        origin_location_name: searchRate.origin,
        origin_type: searchRate.locationOriginType,
        destination_type: searchRate.locationDestinationType,
        destination_location_name: searchRate.destination,
        cargo: searchRate.cargo,
        length: "",
        width: "",
        height: "",
        weight: "",
        destination_code: searchRate.destination_code,
        origin_code: searchRate.origin_code,
        countery_code_origin: searchRate.countery_code_origin,
        countery_code_destination: searchRate.countery_code_destination,
        description: searchRate.description,
      });
    }
    console.log(data)
    const response = await axios.post(
      "https://camp-coding.tech/ocean_burg/user/add_cotation.php",
      data
    );
  console.log(response)

    if (response.data.status == "success")
      window.location.href = "/userdashboard/userquotes";
    return response.data;
  } else {
    return { message: "You Should Login First" };
  }
};
