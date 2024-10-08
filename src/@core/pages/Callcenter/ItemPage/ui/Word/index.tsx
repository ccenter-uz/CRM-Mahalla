import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, forwardRef } from "react";
import dayjs from "dayjs";
import "./style.css";

type Props = {
  data: any;
  ref: any;
};

export const Word: FC<Props> = forwardRef((props, ref: any) => {
  const { data } = props;

  return (
    <Box
      ref={ref}
      bg={"#fff"}
      p={"24px"}
      borderRadius={"8px"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.02)"}
      className="word"
    >
      <Flex
        align={"center"}
        justify={"space-between"}
        className="header"
        w={"90%"}
        mb={"1em"}
      >
        <Text as={"h1"} fontSize={"26px"} fontWeight={600}>
          O‘zbekiston mahallalari uyushmasi <br />
          ishonch raqamiga kelib tushgan murojaat
        </Text>
        <img
          src="/logoZip.webp"
          alt="Prezidentga Murojaat Logo"
          width={124}
          height={124}
        />
      </Flex>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>№</th>
            <th>Ma'lumot</th>
            <th>Tafsilotlar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Murojaat tartib raqami</td>
            <td>{data[0]?.incoming_number || "Маълумот йўқ"}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Operator raqami</td>
            <td>{data[0]?.operator_number || "Маълумот йўқ"}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Murojaat tuzilgan sana va vaqt</td>
            <td>
              {data[0]?.create_data
                ? dayjs(new Date(data[0]?.create_data)).format(
                    "DD.MM.YYYY HH:mm"
                  )
                : "Маълумот йўқ"}
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Murojaat etuvchi F.I.O.</td>
            <td>{data[0]?.applicant || "Маълумот йўқ"}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Murojaat etuvchining manzili</td>
            <td>
              {`${
                data[0]?.districts?.region?.title[0].toUpperCase() +
                data[0]?.districts?.region?.title.slice(1)
              }, ${data[0]?.districts?.title}, ${data[0]?.mfy || ""}  ${
                data[0]?.street_and_apartment || ""
              }` || "Маълумот йўқ"}
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Murojaat etuvchi jinsi, tug'ilgan yili</td>
            <td>
              {(data[0]?.gender === "male" && "Эркак") ||
                (data[0]?.gender === "female" && "Аёл") ||
                data[0]?.gender ||
                "Маълумот йўқ"}
              {" - "}
              {data[0]?.applicant_birthday
                ? dayjs(data[0]?.applicant_birthday).format("DD.MM.YYYY")
                : "Маълумот йўқ"}
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>Yuridik yoki Jismoniy shaxs</td>
            <td>{data[0]?.organization_type || "Маълумот йўқ"}</td>
          </tr>
          <tr>
            <td>8.1</td>
            <td>Telefon raqami</td>
            <td>{data[0]?.phone || "Маълумот йўқ"}</td>
          </tr>
          <tr>
            <td>8.2</td>
            <td>Qo'shimcha telefon raqami</td>
            <td>{data[0]?.additional_phone || "Маълумот йўқ"}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Murojaatning qisqacha mazmuni</td>
            <td>{data[0]?.comment || "Маълумот йўқ"}</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
});
