
import {Button, Form, Input, Modal, Typography} from "antd";
import md5 from "md5";
import { useState, type ReactNode } from "react";

interface IAuthFormValues {
  login: string;
  companyId: string;
  password: string;
}

interface IShopById {
    ResultCode: number,
    Shops: [
        {
            ShopId: number,
            ShopName: string,
            CompanyId: number,
            Address: string,
            Place: string,
            Coordinates: string,
            WorkTime: string,
            CreateDateTime: string,
            SupportPhone: string,
            StocksAccounting: boolean,
            ForDeviceType: number,
            CloudFiscalization: boolean,
            ProductBaseTemplateId: number
        }
    ]
    // "ResultCode": 0,
    // "Shops": [
    //     {
    //         "ShopId": 618289,
    //         "ShopName": "Агротерминал Склад",
    //         "CompanyId": 107700,
    //         "Address": "г.Красноярск ул. Полигонная 1 стр.1",
    //         "Place": "Склад ",
    //         "Coordinates": "56.076775,92.957773",
    //         "WorkTime": "08:00-19:00",
    //         "CreateDateTime": "22.01.2025 11:24:52",
    //         "SupportPhone": "8-923-356-61-10",
    //         "StocksAccounting": true,
    //         "ForDeviceType": 2,
    //         "CloudFiscalization": true,
    //         "ProductBaseTemplateId": 2755
    //     }
    // ]
}

const INSURANCE_FORM_NAME = 'insuranceForm';

export const AuthorizationPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [isSubmit, setIsSubmit] = useState(false);

  const [data, setData] = useState<IShopById | null>(null);
  // const [error, setError] = useState(null);

  const [insuranceForm] = Form.useForm();

  // const [md5Hash, setMd5Hash] = useState("");

  //   const convertToMd5 = () => {
  //       const hash = md5(inputValue);
  //       setMd5Hash(hash);
  //   };

    const handleSubmit = (values: IAuthFormValues) => {
      setIsLoading(true);
      console.log('values', values);
      const { companyId, password, login } = values;
      const requestId = Date.now().toString();
      const sign = md5(companyId + password + requestId).toString();
      console.log('sign', sign);

      // const url = 'https://api.kitshop.ru/APIService.svc/GetProducts';
      const url = 'https://api.kitshop.ru/APIService.svc/GetShopById';
      // const url = 'https://api.kitshop.ru/APIService.svc/CheckAuth';
const data = {
  Auth: {
    CompanyId: Number(companyId),
    RequestId: Number(requestId),
    UserLogin: login,
    Sign: sign
  },
  Id: 618289

};

fetch(url, {
  method: 'POST',
  headers: {
    // "Host": "api.kitshop.ru",
// "Content-Lenght": "244"

      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
    // 'Content-Type': '*',
    // 'Accept': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    // 'Host': 'api.kitshop.ru',
    // 'Content-Length': '189'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then((shopById: IShopById) => {
    setIsOpen(false)
    setData(shopById)
    setIsLoading(false)
    console.log('Success:', shopById);
  })
  .catch((error) => {
    setIsLoading(false)
    console.error('Error:', error);
  });
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('https://api.kitshop.ru/APIService.svc/GetProducts');
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     setData(data);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // };

    // fetchData();
      
      
    // const isNotChangesForm =
    //   value.investmentAmount === investmentAmount &&
    //   value.termYears === (termYears || undefined) &&
    //   value.paymentPeriod === paymentPeriod.find((period) => period.isSelected)?.nameRu;

    // const bodyForUpdateProposal: ICacheUpdateProposalInput = {
    //   portfolio: {
    //     nonInvestmentLifeInsuranceTools: [
    //       {
    //         temporalProposalToolId,
    //         termYears: termYears ? value.termYears || 0 : value.termYears,
    //         investmentAmount: value.investmentAmount,
    //         newAssets: newAssets ? 0 : undefined,
    //         oldAssets: oldAssets ? 0 : undefined,
    //         paymentPeriod: paymentPeriod.map(({ id, nameRu }) => {
    //           return {
    //             id,
    //             isSelected: nameRu === value.paymentPeriod,
    //           };
    //         }),
    //       },
    //     ],
    //   },
    // };
    // isNotChangesForm
    //   ? handleClose()
    //   : handleUpdateProposalDataInCache(bodyForUpdateProposal, undefined, () =>
    //       handleSuccessUpdateNLI(value.investmentAmount)
    //     );
  };

   const formRender = (dom: ReactNode) => (
    <Form<IAuthFormValues>
      form={insuranceForm}
      name={INSURANCE_FORM_NAME}
      clearOnDestroy
      layout='vertical'
      autoComplete='off'
      requiredMark={false}
      size='large'
      // disabled={updateProposalDataInCacheRD.isPending}
      onFinish={handleSubmit}
    >
      {dom}
    </Form>
  );
  return (
     <>
      <Modal 
          open={isOpen}
          centered
          // loading={precalculatePortfolioRD.isPending}
          title={
            <Typography.Title level={3} >
              Введите логин пользователя
            </Typography.Title>
          }
          footer={
            <Button htmlType="submit" size="large">
              Применить
            </Button>
          }
          okText='Применить'
          cancelText='Отменить'
          destroyOnHidden
          maskClosable={false}
          loading={isLoading}
          
          // okButtonProps={{
          //   htmlType: 'submit',
          //   size: 'large',
            // loading: updateProposalDataInCacheRD.isPending,
            // disabled: isDisabledSubmit,
          // }}
          // cancelButtonProps={{
            // ['data-bcs-id']: testId('cancel'),
            // size: 'large',
            // disabled: updateProposalDataInCacheRD.isPending,
          // }}
          width={600}
          modalRender={formRender}
          closable={false}
          // onOk={() => setIsSubmit(true)}
          // onCancel={() => {
          //   setIsOpen(false);
          // }} 
           >
            <Form.Item label='Логин' initialValue='nikiTank' name='login' rules={[{ required: true, message: 'Поле обязательно к заполнению' }]}>
        <Input size="large"/>
            </Form.Item>
            <Form.Item label='id Компании' initialValue='107700'  name='companyId' rules={[{ required: true, message: 'Поле обязательно к заполнению' }]}>
        <Input size="large"/>
            </Form.Item>
            <Form.Item label='пароль' name='password' rules={[{ required: true, message: 'Поле обязательно к заполнению' }]}>
        <Input size="large"/>
            </Form.Item>
      </Modal>
      {data?.Shops && <pre style={{ color: '#000' }}>
        <code>
          {JSON.stringify(data, null, 2)}
        </code>
        </pre>}
     </>
  ); 
};


//  const formRender = (dom: ReactNode) => (
//     <Form<IInsuranceModalFormValues>
//       data-bcs-id={testId('form')}
//       form={insuranceForm}
//       name={INSURANCE_FORM_NAME}
//       clearOnDestroy
//       layout='vertical'
//       autoComplete='off'
//       requiredMark={false}
//       size='large'
//       disabled={updateProposalDataInCacheRD.isPending}
//       onFinish={handleSubmit}
//     >
//       {dom}
//     </Form>
//   );
{/* <Modal
          data-bcs-id={testId()}
          open={open}
          centered
          loading={precalculatePortfolioRD.isPending}
          title={
            <Text data-bcs-id={testId('title')} size='lg'>
              {t('parametersNLI')}
            </Text>
          }
          okText={t('confirm')}
          cancelText={t('cancel')}
          destroyOnHidden={!open}
          maskClosable={false}
          okButtonProps={{
            ['data-bcs-id']: testId('confirm'),
            htmlType: 'submit',
            size: 'large',
            loading: updateProposalDataInCacheRD.isPending,
            disabled: isDisabledSubmit,
          }}
          cancelButtonProps={{
            ['data-bcs-id']: testId('cancel'),
            size: 'large',
            disabled: updateProposalDataInCacheRD.isPending,
          }}
          width={400}
          modalRender={formRender}
          closable={false}
          onOk={() => setSubmittable(true)}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <InsuranceModalContent submittable={submittable} tool={tool} />
        </Modal> */}
