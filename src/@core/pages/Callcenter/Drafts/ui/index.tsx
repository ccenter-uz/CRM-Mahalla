"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import { usePagination } from "@/@core/shared/hook/usePaginate";
import BreadCrumb from "@/@core/shared/ui/Breadcrumb";
import Pagination from "@/@core/shared/ui/Pagination";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import TableGen from "@/@core/shared/ui/Table";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect } from "react";
import { useGlobal } from "@/@core/application/store/global";
import { useRouter, useSearchParams } from "next/navigation";
import { useRequest } from "../model/Slicer";
import { postChangeRazdel } from "../api";
import { getcallcenterforExcel } from "../api/getExcel";
import { FilterTable } from "@/@core/features/FilterTable";
import { callcenterColumns } from "@/@core/application/helper/callCenterColumns";
import { GlobalVars } from "@/@core/shared/vars";

export const Drafts: FC = () => {
  const breadcrumb = [
    {
      id: 1,
      title: "Мурожаатлар",
    },
    {
      id: 2,
      title: "Колл-маркази",
    },
    {
      id: 3,
      title: "Қораламалар",
    },
  ];
  const params = useSearchParams();
  const router = useRouter();
  const { current, pageSize, total, setTotal } = usePagination();

  const {
    setPodrazdel,
    getPodrazdel,
    getDistrictByRegionId,
    setDistrict,
    getDistrict,
    getOperators,
    getRazdel,
    getRegions,
    getOrganizations,
  } = useGlobal();
  const { data, GET } = useRequest();

  const getData = async () => {
    const query = {
      page: current,
      pageSize: pageSize,
      applicant_birthday:
        params.get("applicant_birthday") || GlobalVars.NullString,
      phone:
        params.has("phone") && params.get("phone") !== GlobalVars.NullString
          ? `+${String(params.get("phone")).trim()}`
          : GlobalVars.NullString,
      applicant: params.get("applicant") || GlobalVars.NullString,
      operators: params.get("operators") || GlobalVars.NullString,
      response: params.get("response") || GlobalVars.NullString,
      income_number: params.get("income_number") || GlobalVars.NullString,
      region: params.get("region") || GlobalVars.NullString,
      district: params.get("district") || GlobalVars.NullString,
      categoryId: params.get("categoryId") || GlobalVars.NullString,
      subCategoryId: params.get("subCategoryId") || GlobalVars.NullString,
      date_from:
        params.get("date_from") !== GlobalVars.NullString &&
        params.get("date_from")
          ? new Intl.DateTimeFormat("ru-RU").format(
              new Date(params.get("date_from") || GlobalVars.NullString)
            )
          : GlobalVars.NullString,
      date_to:
        params.get("date_to") !== GlobalVars.NullString && params.get("date_to")
          ? new Intl.DateTimeFormat("ru-RU").format(
              new Date(params.get("date_to") || GlobalVars.NullString)
            )
          : GlobalVars.NullString,
    };
    const res = await GET(query);

    res.status === 200 && setTotal(res?.data?.pagination?.totalItems);
  };

  // get-all-data
  useEffect(() => {
    Promise.all([
      getRazdel(),
      getPodrazdel(),
      getRegions(),
      getDistrict(),
      getOrganizations({
        page: GlobalVars.FirstPage,
        pageSize: GlobalVars.All,
        search: GlobalVars.NullString,
      }),
      getOperators({
        page: GlobalVars.FirstPage,
        pageSize: GlobalVars.All,
        search: GlobalVars.NullString,
        role: "operator",
      }),
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Promise.all([getData()]).then(() => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // FINISH
  const handleFinish = (values: any) => {
    const query = `?page=${
      GlobalVars.FirstPage
    }&pageSize=${pageSize}&operators=${
      values.operators || GlobalVars.NullString
    }&applicant=${
      values.applicant || GlobalVars.NullString
    }&applicant_birthday=${
      values.applicant_birthday || GlobalVars.NullString
    }&phone=${values.phone || GlobalVars.NullString}&response=${
      values.response || GlobalVars.NullString
    }&income_number=${values.income_number || GlobalVars.NullString}&region=${
      values.region || GlobalVars.NullString
    }&district=${values.district || GlobalVars.NullString}&categoryId=${
      values.categoryId || GlobalVars.NullString
    }&subCategoryId=${
      values.subCategoryId || GlobalVars.NullString
    }&date_from=${values.date_from || GlobalVars.NullString}&date_to=${
      values.date_to || GlobalVars.NullString
    }`;

    router.push(query);
  };
  // PAGINATION
  const handlePageChange = (page: number) => {
    router.push(
      `?page=${page}&pageSize=${pageSize}&operators=${params.get(
        "operators"
      )}&applicant=${
        params.get("applicant") || GlobalVars.NullString
      }&applicant_birthday=${
        params.get("applicant_birthday") || GlobalVars.NullString
      }&phone=${
        params.get("phone") || GlobalVars.NullString
      }&response=${params.get("response")}&income_number=${
        params.get("income_number") || GlobalVars.NullString
      }&region=${params.get("region") || GlobalVars.NullString}&district=${
        params.get("district") || GlobalVars.NullString
      }&categoryId=${
        params.get("categoryId") || GlobalVars.NullString
      }&subCategoryId=${
        params.get("subCategoryId") || GlobalVars.NullString
      }&date_from=${params.get("date_from") || GlobalVars.NullString}&date_to=${
        params.get("date_to") || GlobalVars.NullString
      }`
    );
  };
  const handlePageSizeChange = (pageSize: number) => {
    router.push(
      `?page=1&pageSize=${pageSize}&operators=${params.get(
        "operators"
      )}&applicant=${params.get("applicant") || GlobalVars.NullString}&phone=${
        params.get("phone") || GlobalVars.NullString
      }&applicant_birthday=${
        params.get("applicant_birthday") || GlobalVars.NullString
      }&response=${params.get("response")}&income_number=${
        params.get("income_number") || GlobalVars.NullString
      }&region=${params.get("region") || GlobalVars.NullString}&district=${
        params.get("district") || GlobalVars.NullString
      }&categoryId=${
        params.get("categoryId") || GlobalVars.NullString
      }&subCategoryId=${
        params.get("subCategoryId") || GlobalVars.NullString
      }&date_from=${params.get("date_from") || GlobalVars.NullString}&date_to=${
        params.get("date_to") || GlobalVars.NullString
      }`
    );
  };

  // CHANGE
  const handleChangeRazdel = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === GlobalVars.NullString) {
      await getPodrazdel();
    } else {
      const data = await postChangeRazdel(e.target.value);

      data?.status === 200 && setPodrazdel(data?.data.results);
    }
  };

  const handleChangeRegion = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === GlobalVars.NullString) {
      await getDistrict();
    } else {
      const data = await getDistrictByRegionId(e.target.value);
      data?.status === 200 &&
        setDistrict(
          data?.results.map((d: any, index: number) => ({
            index: index + 1,
            ...d,
          }))
        );
    }
  };

  return (
    <Box
      p={{ base: "5px 10px", sm: "5px 10px", md: "8px 16px", xl: "8px 16px" }}
    >
      <BreadCrumb item={breadcrumb} />
      <PaperContent>
        <Flex align={"center"} justify="space-between">
          <Text
            my={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
            fontWeight={500}
            color={scssVariables.textGreyColor}
            fontSize={{ base: "18px", sm: "18px", md: "24px", xl: "24px" }}
          >
            Қораламалар руйхати: Колл-центр
          </Text>
          <Button
            leftIcon={
              <Image src="/excel.png" alt="excel" w={"18px"} h={"18px"} />
            }
            color={"green.300"}
            variant={"link"}
            fontSize={scssVariables.fonts.span}
            onClick={() => getcallcenterforExcel(callcenterColumns, data)}
          >
            Excel
          </Button>
        </Flex>
        {/* FILTER */}
        <FilterTable
          handleChangeRazdel={handleChangeRazdel}
          handleFinish={handleFinish}
          handleChangeRegion={handleChangeRegion}
        />
        <TableGen columns={callcenterColumns} dataSource={data} />
        <Pagination
          total={total}
          current={current}
          pageSize={pageSize}
          onChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </PaperContent>
    </Box>
  );
};
