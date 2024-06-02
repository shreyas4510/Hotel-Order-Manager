import React, { useEffect } from 'react';
import { MdDeleteForever, MdModeEditOutline } from 'react-icons/md';
import CustomSelect from '../../components/CustomSelect';
import { TiPlus } from 'react-icons/ti';
import ActionDropdown from '../../components/ActionDropdown';
import Table from '../../components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import '../../assets/styles/menu.css';
import { useDispatch, useSelector } from 'react-redux';
import OMTModal from '../../components/Modal';
import {
    createCategoryRequest,
    getCategoryRequest,
    removeCategoryRequest,
    setcategoryModalData,
    setSelectedCategory,
    updateCategoryRequest
} from '../../store/slice/menu.slice';
import moment from 'moment/moment';
import { IoCloseSharp } from 'react-icons/io5';
import {
    defaultValidation,
    validateCreateCategory,
    validateRemoveCategory,
    validateUpdateCategory
} from '../../validations/menu.js';

function Menu() {
    const dispatch = useDispatch();
    const { selectedCategory, categoryModalData, categoriesOptions, data } = useSelector((state) => state.menu);
    const hotelId = useSelector((state) => state.hotel.globalHotelId);

    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.display({
            id: 'email',
            header: 'Email',
            cell: (props) => <div>{props.row.original.email}</div>
        }),
        columnHelper.display({
            id: 'createdAt',
            header: 'Invited',
            cell: ({ row }) => {
                return row.original.createdAt && <div>{moment(row.original.createdAt).format('DD-MMM-YYYY')}</div>;
            }
        }),
        columnHelper.display({
            id: 'status',
            header: 'Status',
            cell: ({ row }) => <div>{row.original.status}</div>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            enableSorting: 'FALSE',
            enableFiltering: 'FALSE',
            cell: ({ row }) => {
                return row.original.status ? (
                    <ActionDropdown
                        disabled={row.original.status.toUpperCase() === 'ACCEPTED'}
                        options={[
                            {
                                label: 'Delete',
                                icon: MdDeleteForever,
                                onClick: setRemoveInvite,
                                meta: { id: row.original.id },
                                onClick: () => {
                                    dispatch(setSelectedInvite(row.original.id));
                                    handleClose();
                                }
                            }
                        ]}
                    />
                ) : (
                    <></>
                );
            }
        })
    ];

    useEffect(() => {
        if (hotelId) {
            dispatch(getCategoryRequest(hotelId));
        }
    }, [hotelId]);

    const handleAddButtonClick = (modalData, values) => {
        const { options } = modalData;
        const { add_button, ...rest } = options;

        const updatedOps = { ...rest };
        const key = moment().valueOf();
        ['name', 'order', 'icon'].map((item) => {
            const iconKey = Object.keys(updatedOps).find((key) => key.startsWith(`${item}_`));
            updatedOps[`${item}_${key}`] = {
                ...rest[iconKey],
                name: `${item}_${key}`
            };
        });
        updatedOps.add_button = add_button;

        const updatedInitialVals = {
            ...values,
            [`name_${key}`]: '',
            [`order_${key}`]: ''
        };

        modalData = {
            ...modalData,
            initialValues: updatedInitialVals,
            options: updatedOps
        };
        dispatch(setcategoryModalData(modalData));
        return modalData;
    };

    const handleRemoveClick = (id, modalData) => {
        const { options, initialValues } = modalData;

        let updatedOptions = { ...options };
        let updatedInitialVals = { ...initialValues };

        delete updatedOptions[`name_${id}`];
        delete updatedOptions[`order_${id}`];
        delete updatedOptions[`icon_${id}`];

        delete updatedInitialVals[`name_${id}`];
        delete updatedInitialVals[`order_${id}`];

        modalData = {
            ...modalData,
            initialValues: updatedInitialVals,
            options: updatedOptions
        };

        dispatch(setcategoryModalData(modalData));
        return modalData;
    };

    const handleAddCategoryClick = () => {
        let addOptions = {
            title: 'Create Category',
            type: 'create',
            initialValues: {
                name_0: '',
                order_0: ''
            },
            options: {
                name_0: {
                    name: 'name_0',
                    type: 'text',
                    label: 'Name',
                    className: 'col-6 my-2'
                },
                order_0: {
                    name: 'order_0',
                    type: 'number',
                    label: 'Order',
                    className: 'col-5 my-2'
                },
                icon_0: {
                    name: 'icon_0',
                    type: 'icon',
                    icon: IoCloseSharp,
                    className: 'col my-2 align-self-end w-100 pointer',
                    onClick: (id) => {
                        addOptions = handleRemoveClick(id, addOptions);
                    }
                },
                add_button: {
                    name: 'add_button',
                    type: 'button',
                    label: 'Add',
                    className: 'col my-2 ms-auto w-100',
                    getValues: true,
                    invalidDisable: true,
                    onClick: (values) => {
                        addOptions = handleAddButtonClick(addOptions, values);
                    }
                }
            },
            submitText: 'Submit',
            closeText: 'Close'
        };

        dispatch(setcategoryModalData(addOptions));
    };

    const handleUpdateCategoryClick = () => {
        const { rows } = data;
        const category = rows.find((obj) => obj.id === selectedCategory.value);
        let updateOptions = {
            title: 'Update Category',
            type: 'update',
            initialValues: {
                name: category.name,
                order: category.order
            },
            options: {
                name: {
                    name: 'name',
                    type: 'text',
                    label: 'Name',
                    className: 'col-6 my-2'
                },
                order: {
                    name: 'order',
                    type: 'number',
                    label: 'Order',
                    className: 'col-6 my-2'
                }
            },
            submitText: 'Update',
            closeText: 'Close'
        };

        dispatch(setcategoryModalData(updateOptions));
    };

    const handleDeleteCategoryClick = () => {
        const { rows } = data;
        const { options, initialValues } = rows.reduce(
            (cur, next) => {
                const key = `category_${next.id}`;
                cur.options[key] = {
                    name: key,
                    type: 'checkbox',
                    label: `${next.name}`,
                    className: 'd-flex justify-content-between my-2'
                };
                cur.initialValues[key] = false;
                return cur;
            },
            { initialValues: {}, options: {} }
        );

        let removeOptions = {
            title: 'Remove Categories',
            type: 'remove',
            initialValues,
            options: {
                warning: {
                    name: 'warning',
                    type: 'strong',
                    label: '⚠️ Warning: Deleting categories will remove all menu items linked with them! Please be careful before proceeding!',
                    className: 'text-center my-2 text-danger'
                },
                ...options
            },
            submitText: 'Remove',
            closeText: 'Close'
        };

        dispatch(setcategoryModalData(removeOptions));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);

        if (categoryModalData.type === 'create') {
            const payload = Object.entries(values).reduce((cur, next) => {
                const obj = next[0].split('_');
                if (!cur[obj[1]]) cur[obj[1]] = {};
                cur[obj[1]][obj[0]] = next[1];
                return cur;
            }, {});
            dispatch(
                createCategoryRequest({
                    hotelId,
                    data: Object.values(payload)
                })
            );
        }

        if (categoryModalData.type === 'update') {
            const categoryId = selectedCategory.value;
            const data = {};
            Object.keys(values).map((key) => {
                if (values[key] !== categoryModalData.initialValues[key]) data[key] = values[key];
            });

            dispatch(
                updateCategoryRequest({
                    hotelId,
                    categoryId,
                    data
                })
            );
        }

        if (categoryModalData.type === 'remove') {
            const categoryIds = Object.entries(values).reduce((cur, [key, value]) => {
                const id = key.split('_')[1];
                if (value) cur.push(id);
                return cur;
            }, []);

            dispatch(removeCategoryRequest({ hotelId, categoryIds }));
        }

        setSubmitting(false);
    };

    const getValidationSchema = () => {
        switch (categoryModalData.type) {
            case 'create':
                return validateCreateCategory(categoryModalData?.initialValues, data?.rows);
            case 'update':
                return validateUpdateCategory(categoryModalData?.initialValues, data?.rows);
            default:
                return defaultValidation;
        }
    };

    return (
        <>
            <div className="w-50 mx-auto my-5">
                <h6>Categories</h6>
                <div className="d-flex">
                    <CustomSelect
                        className="w-100 me-4"
                        options={categoriesOptions || []}
                        value={selectedCategory}
                        onChange={(item) => {
                            dispatch(setSelectedCategory(item));
                        }}
                    />
                    <ActionDropdown
                        options={[
                            {
                                label: 'Add',
                                icon: TiPlus,
                                onClick: handleAddCategoryClick
                            },
                            {
                                label: 'Update',
                                icon: MdModeEditOutline,
                                disabled: !Object.keys(selectedCategory).length,
                                onClick: handleUpdateCategoryClick
                            },
                            {
                                label: 'Delete',
                                disabled: !Object.keys(selectedCategory).length,
                                icon: MdDeleteForever,
                                onClick: handleDeleteCategoryClick
                            }
                        ]}
                    />
                </div>
            </div>
            {Object.keys(selectedCategory).length ? (
                <div className="m-5 d-flex flex-column">
                    <div className="options-container d-flex align-items-center px-4">
                        <h5 className="text-white">{selectedCategory.label}</h5>
                        <ActionDropdown
                            className="ms-auto"
                            buttonColor="white"
                            iconColor="#49AC60"
                            options={[
                                {
                                    label: 'Add',
                                    icon: TiPlus,
                                    onClick: () => {}
                                },
                                {
                                    label: 'Update',
                                    icon: MdModeEditOutline,
                                    disabled: true,
                                    onClick: () => {}
                                },
                                {
                                    label: 'Delete',
                                    disabled: true,
                                    icon: MdDeleteForever,
                                    onClick: () => {}
                                }
                            ]}
                        />
                    </div>
                    <Table columns={columns} data={[]} count={3} />
                </div>
            ) : (
                <></>
            )}

            <OMTModal
                show={categoryModalData}
                type="form"
                validationSchema={getValidationSchema}
                title={categoryModalData?.title}
                initialValues={categoryModalData?.initialValues || {}}
                handleSubmit={handleSubmit}
                description={categoryModalData?.options || {}}
                handleClose={() => {
                    dispatch(setcategoryModalData(false));
                }}
                isFooter={false}
                size={categoryModalData.type === 'remove' ? 'md' : 'lg'}
                submitText={categoryModalData?.submitText}
                closeText={categoryModalData?.closeText}
            />
        </>
    );
}

export default Menu;
