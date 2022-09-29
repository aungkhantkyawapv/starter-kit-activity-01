import { Descriptions, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useGetLifeQuery } from '../../../api';
import LoadingElement from '../../../components/LoadingElement';
import InternalErrorResult from '../../../components/results/InternalErrorResult';
import NotFoundResult from '../../../components/results/NotFoundResult';
import BasicLayout from '../../../layouts/BasicLayout';

const LifeDetail = () => {
    const { t } = useTranslation(['life']);
    const { id } = useParams();
    const { data, loading, error } = useGetLifeQuery({ variables: { id } });

    if (error) {
        return <InternalErrorResult />;
    }

    if (loading) {
        return <LoadingElement />;
    }

    const response = data?.getLife;

    if (!response) {
        return <NotFoundResult />;
    }

    return (
        <BasicLayout>
            <Descriptions size="middle" title="Life Detail">
                <Descriptions.Item label={t('firstName')}>{response.firstName}</Descriptions.Item>
                <Descriptions.Item label={t('lastName')}>{response.lastName}</Descriptions.Item>
                <Descriptions.Item label={t('fullName')}>{response.fullName}</Descriptions.Item>
                <Descriptions.Item label={t('birthday')}>
                    {new Date(response.birthday).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label={t('title')}>{response.title}</Descriptions.Item>
                <Descriptions.Item label={t('description')}>{response.description}</Descriptions.Item>
                <Descriptions.Item label={t('hobbies')}>
                    {response.hobbies.map(hobby => (
                        <Space size="middle">
                            <p>{hobby.toUpperCase()}</p> &nbsp;
                        </Space>
                    ))}
                </Descriptions.Item>
            </Descriptions>
        </BasicLayout>
    );
};

export default LifeDetail;
