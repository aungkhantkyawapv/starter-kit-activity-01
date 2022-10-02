import { Button, DatePicker, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCreateLifeMutation } from '../../../api';
import BasicLayout from '../../../layouts/BasicLayout';

const LifeCreate = () => {
    const { t } = useTranslation(['life']);

    const [createLife] = useCreateLifeMutation();

    const onFinish = async values => {
        const formData = {
            ...values,
        };

        formData.birthday = new Date(values.birthday);
        formData.hobbies = values.hobbies.split(' ');

        await createLife({ variables: { life: formData } });

        message.success('Life created successfully');
    };

    return (
        <BasicLayout>
            <Form labelCol={{ span: 8 }} onFinish={onFinish} wrapperCol={{ span: 16 }}>
                <Form.Item
                    label={t('firstName')}
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your firstname!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('lastName')}
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your lastname!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t('title')}
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t('birthday')}
                    name="birthday"
                    rules={[{ required: true, message: 'Please input your birthday!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label={t('description')}
                    name="description"
                    rules={[{ required: true, message: 'Please input description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label={t('hobbies')}
                    name="hobbies"
                    rules={[{ required: true, message: 'Please input your hobbies!' }]}
                >
                    <Input placeholder="Enter hobbies by spacing between each" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                    <Button htmlType="submit" type="primary">
                        {t('createLife')}
                    </Button>
                </Form.Item>
            </Form>
        </BasicLayout>
    );
};

export default LifeCreate;
