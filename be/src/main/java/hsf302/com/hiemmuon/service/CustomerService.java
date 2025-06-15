package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.CustomerDTO;
import hsf302.com.hiemmuon.dto.RegisterCustomerDTO;
import hsf302.com.hiemmuon.dto.UpdateCustomerDTO;

import java.util.List;

public interface CustomerService {
    List<CustomerDTO> getAllCustomers();
    CustomerDTO getMyInfo(String email);
    void updateMyInfo(String email, UpdateCustomerDTO dto);

    Void registerCustomer(RegisterCustomerDTO dto);
}
