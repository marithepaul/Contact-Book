package com.example.demo.controller;

import com.example.demo.model.Contact;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    private final List<Contact> contacts = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    // Create a new contact
    @PostMapping("/")
    public Contact addContact(@RequestBody Contact contact) {
        contact.setId(counter.incrementAndGet());
        contacts.add(contact);
        return contact;
    }

    // Retrieve all contacts
    @GetMapping("/")
    public List<Contact> getAllContacts() {
        return contacts;
    }

    // Delete a contact
    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) {
        contacts.removeIf(contact -> contact.getId().equals(id));
    }
}
