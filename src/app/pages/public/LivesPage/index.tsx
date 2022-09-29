import { Button, Table } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useListLivesQuery } from '../../../api';
import InternalErrorResult from '../../../components/results/InternalErrorResult';
import BasicLayout from '../../../layouts/BasicLayout';

const LivesPage = () => {
    const { t } = useTranslation(['life']);
    const navigate = useNavigate();

    const { data, loading, error } = useListLivesQuery();

    if (error) {
        return <InternalErrorResult />;
    }

    const response = data?.listLives;

    const columns = useMemo(
        () => [
            {
                title: t('firstName'),
                dataIndex: 'fullName',
                key: 'fullName',
            },
            {
                title: t('birthday'),
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: t('title'),
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: t('hobbies'),
                dataIndex: 'hobbies',
                key: 'hobbies',
                render: hobbies => hobbies.map(hobby => <p>{hobby.toUpperCase()}</p>),
            },
            {
                title: t('action'),
                dataIndex: '',
                key: 'x',
                render: (_, record) => (
                    <Button
                        onClick={() => {
                            navigate(`/life-detail/${record?.id}`);
                        }}
                        type="primary"
                    >
                        Details
                    </Button>
                ),
            },
        ],
        []
    );

    return (
        <BasicLayout>
            <Button onClick={() => navigate('/create-life')} type="primary">
                Create Life
            </Button>
            <Table columns={columns} dataSource={response} loading={loading} rowKey="id" />
        </BasicLayout>
    );
};

export default LivesPage;
