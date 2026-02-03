package fu.se.chapter13orchid.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrchidUpdateRequest {
    private String orchidName;
    private String description;
    private Integer categoryId;
    private Boolean isSpecial;
    private String image;
    private Double price;
}
