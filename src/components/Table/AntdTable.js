import React, {useState, useEffect} from 'react';
import { Popconfirm, Table, Button, Space, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import {} from 'lodash';
import Highlighter from 'react-highlight-words';

const AntdTable = () => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editRowKey, setEditRowKey] = useState("");
    const [form] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState("");
    const [searchText, setSearchText] = useState('');
    const [searchColText, setSearchColText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredInfo, setFilteredInfo] = useState('');
    let [filteredData] = useState([]);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        setLoading(true);
        const result = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setGridData(result.data);
        setLoading(false);
    }
    const dataWithAge = gridData.map((item) => ({
        ...item,
        age: Math.floor(Math.random() * 6) + 20,
    }));

    const modifiedData = dataWithAge.map(({body, ...item}) => ({
        ...item,
        key:item.id,
        info: `This is content of ${item.name} and email is ${item.email} and message is ${body}`,
        message: body ? body:item.message,
    }));

    const isEditing = (record) => {
        return record.key === editRowKey;
    }
    const cancel =() =>{};
    const save = async(key) => {
        try {
            const row = await form.validateFields();
            const newData = [...modifiedData];
            const index = newData.findIndex((item) => key === item.key);
            if(index > -1){
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                setGridData(newData);
                setEditRowKey('');
            }else{
                newData.push(row);
                setGridData(newData);
                setEditRowKey('');
            }
        } catch (error) {
            console.log('Validate Failed:', error);
        }
    }
    const edit = (record) => {
        form.setFieldsValue({name: '', email: '', message: '', ...record});
        setEditRowKey(record.key);
    };

    const getColunmSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 0}}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space style={{marginTop:4}}>
                    <Button

                        type="primary"
                        onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleResetCol(clearFilters, dataIndex)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        // onFilterDropdownVisibleChange: (visible) => {
        //     if(visible){
        //         setTimeout(() => searchInput.select(), 100);
        //     }
        // },
        render: (text) => (searchedColumn === dataIndex ? 
        <Highlighter highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
         searchWords={[searchColText]} autoEscape textToHighlight={text.toString()} /> : text)
    });
    const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchColText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleResetCol = (clearFilters, dataIndex) => {
        clearFilters();
        setSearchColText('');
        setSearchedColumn('');
    };

    const columns = [
        {   title: 'ID', 
            dataIndex: 'id',
            algin: 'center',
            editable: false
        },
        {
            title: 'Name',
            dataIndex: 'name',
            algin: 'center',
            editable: true,
            sorter: (a,b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ...getColunmSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            algin: 'center',
            editable: true,
            sorter: (a,b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
            ...getColunmSearchProps('email'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            algin: 'center',
            editable: true,
            sorter: (a,b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            filters: [
                {text: '20', value: 20},
                {text: '21', value: 21},
                {text: '22', value: 22},
                {text: '23', value: 23},
                {text: '24', value: 24},
                {text: '25', value: 25}
            ],
            filteredValue: filteredInfo.age || null,
            onFilter: (value, record) => String(record.age).includes(value)
        },
        {
            title: 'Message',
            dataIndex: 'message',
            algin: 'center',
            editable: true,
            sorter: (a,b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'message' && sortedInfo.order,
            ...getColunmSearchProps('message'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            algin: 'center',
            render: (_, record) => {
                const editable = isEditing(record);


                return modifiedData.length >= 1 ? (
                    <Space>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button danger type="primary" disabled={editable} >Delete</Button>
                        </Popconfirm>
                  {

editable? (
    <span>
        <Space size="middle">
            <Button onClick={(e)=>save(record.key)} 
            type='primary' style={{marginRight:8}}>Save</Button>
            <Popconfirm title="Are u sure to cancel?" onConfirm={cancel}>
                <Button>Cancel</Button>
            </Popconfirm>
        </Space>
    </span>
        ) :(<Button type="primary" onClick={()=>edit(record)}>Edit</Button>)     
                  }      
                        
                    </Space>
                    
                ) : null
            } ,
            editable: false
        }

    ];

    const handleDelete = (key) => {
        const dataSource = [...modifiedData];
        const filteredData = dataSource.filter((item) => item.key !== key);
        setGridData(filteredData);
    };

    const mergedColumns = columns.map((col) => {
        if(!col.editable){
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            })
        }
    });


    const EditableCell = ({editing, dataIndex, title, record, children, ...restProps}) => {
        const inputNode = <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{margin: 0}}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`
                            }
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        )
    };
    const handleOnChange = (pagination, filters, ...sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    }

    const reset = () => {
        setSortedInfo(null);
        setSearchText('');
        setFilteredInfo(null);
        loadData();
    }

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        if(e.target.value === ''){
            loadData();
        }
    };
    const globalSearch = () => {
        filteredData = modifiedData.filter((value) => {
            return value.name.toLowerCase().includes(searchText.toLowerCase()) ||
            value.email.toLowerCase().includes(searchText.toLowerCase()) ||
            value.message.toLowerCase().includes(searchText.toLowerCase());
        });
        setGridData(filteredData);
    };
    return (
        <div className='antd-table'>
            <Space style={{marginBottom: 16}}>
                <Input placeholder='Search'
                type='text'
                value={searchText} 
                allowClear
                onChange={handleInputChange} />
                <Button type="primary" onClick={globalSearch}>Search</Button>
                <Button type="primary" onClick={reset}>Reset</Button>
            </Space>
            <Form form={form} component={false}>
            <Table
                columns={mergedColumns}
                components={{body: {cell:EditableCell}}}
                dataSource={filteredData && filteredData.length ? filteredData : modifiedData}
                expandable={{
                    expandedRowRender: record => <p style={{margin: 0}}>{record.info}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable'
                }}
                rowClassName="editable-row"
                rowKey="id"
                size="middle"
                pagination={{position: ['topLeft', 'bottomRight']}
                }
                loading={loading}

                // pagination={{pageSize: 50}} 
                // scroll={{y: 240}}
                onChange={handleOnChange}
                bordered >
            </Table>
            </Form>
            
        </div>
    );
}

export default AntdTable;