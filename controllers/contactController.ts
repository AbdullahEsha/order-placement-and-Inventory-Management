import { Request, Response, NextFunction } from 'express'
import { Contact } from '../models'
import { TContact } from '../types'
import { AppError, catchAsync } from '../utils'

// Create Contact
const createContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // create new contact
    const contact = await Contact.create(req.body as TContact)

    if (!contact) {
      return next(new AppError('Contact not created! 🔴', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Contact created successfully 🔥',
      data: contact,
    })
  },
)

// get all contacts
const getAllContacts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const contacts = await Contact.find()

    if (!contacts) {
      return next(new AppError('No contacts found 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Contacts found successfully 🔥',
      data: contacts,
    })
  },
)

// get contact by id
const getContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const contactId = req.params.id
    const contact = (await Contact.findById(contactId)) as TContact

    if (!contact) {
      return next(new AppError('Contact not found 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Contact found successfully 🔥',
      data: contact,
    })
  },
)

// update contact by id
const updateContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const contactId = req.params.id
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!contact) {
      return next(new AppError('Contact not found 🔴', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Contact updated successfully 🔥',
      data: contact,
    })
  },
)

// delete contact by id
const deleteContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const contactId = req.params.id
    const contact = (await Contact.findByIdAndDelete(contactId)) as TContact

    if (!contact) {
      return next(new AppError('Contact not found 🔴', 404))
    }

    res.status(204).json({
      status: 'success',
      message: 'Contact deleted successfully 🔥',
      data: null,
    })
  },
)

export {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
}
